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
    posts = BlogPost.objects.all().order_by('-created_at')

    paginator = PageNumberPagination()
    paginator.page_size = 3

    result_page = paginator.paginate_queryset(posts, request)
    serializer = BlogPostSerializer(result_page, many=True, context={'request': request})

    return paginator.get_paginated_response(serializer.data)