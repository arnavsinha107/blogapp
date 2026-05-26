from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
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
    return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response({
        "username": request.user.username
    })