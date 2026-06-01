from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, BlogPostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import BlogPost
from rest_framework.pagination import PageNumberPagination
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

# Create your views here.


def home(request):
    return JsonResponse({
        "message": "Backend working"
    })


@api_view(['POST'])
def register_user(request):
    serializer= RegisterSerializer(data=request.data)  
    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "message":"User Registered"
            },
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    serializer = TokenObtainPairSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.user
        return Response({
            "message": "Login successful",
            "username": user.username,
            "access": serializer.validated_data["access"],
            "refresh": serializer.validated_data["refresh"],
        })
    return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response({
        "username": request.user.username
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer=BlogPostSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_posts(request):
    # Retrieve all public posts, or private posts where the author is the currently logged in user
    from django.db.models import Q
    posts = BlogPost.objects.filter(
        Q(is_public=True) | Q(author=request.user)
    ).order_by('-created_at')

    paginator = PageNumberPagination()
    paginator.page_size = 3

    result_page = paginator.paginate_queryset(posts, request)
    serializer = BlogPostSerializer(result_page, many=True, context={'request': request})

    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def google_login(request):
    credential = request.data.get('credential')
    if not credential:
        return Response({"error": "Credential token is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Verify the Google OAuth token
        idinfo = id_token.verify_oauth2_token(
            credential, 
            google_requests.Request(), 
            settings.GOOGLE_CLIENT_ID
        )

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            return Response({"error": "Invalid issuer."}, status=status.HTTP_400_BAD_REQUEST)

        email = idinfo.get('email')
        if not email:
            return Response({"error": "Email not found in Google token."}, status=status.HTTP_400_BAD_REQUEST)

        username = idinfo.get('name') or email.split('@')[0]
        # Clean username so it doesn't contain spaces or symbols that might fail AbstractUser validation
        username = "".join([c for c in username if c.isalnum() or c in ['_', '-']]).lower()

        # Find or create user
        user = User.objects.filter(email=email).first()
        if not user:
            # Handle username collisions
            base_username = username or "googleuser"
            username = base_username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1

            user = User.objects.create_user(
                username=username,
                email=email,
                password=User.objects.make_random_password()
            )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "message": "Google Login successful"
        }, status=status.HTTP_200_OK)

    except ValueError as e:
        return Response({"error": f"Invalid token: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def request_password_reset(request):
    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(email=email).first()
    if user:
        token = default_token_generator.make_token(user)
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        reset_link = f"{settings.FRONTEND_URL}/reset-password?uid={uidb64}&token={token}"

        subject = "Password Reset Request - BlogApp"
        message = f"Hello {user.username},\n\nYou requested a password reset for your account. Click the link below to set a new password:\n\n{reset_link}\n\nIf you did not request this, please ignore this email.\n\nBest,\nBlogApp Team"
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
        except Exception as e:
            return Response({"error": f"Failed to send email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # For security reasons, we return success even if email does not exist (mitigates email harvesting)
    return Response({"message": "Password reset email sent if account exists."}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def confirm_password_reset(request):
    uidb64 = request.data.get('uid')
    token = request.data.get('token')
    new_password = request.data.get('new_password')

    if not all([uidb64, token, new_password]):
        return Response({"error": "All fields (uid, token, new_password) are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password has been reset successfully!"}, status=status.HTTP_200_OK)
    
    return Response({"error": "The reset link is invalid or has expired."}, status=status.HTTP_400_BAD_REQUEST)