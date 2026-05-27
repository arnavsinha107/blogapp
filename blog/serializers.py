from rest_framework import serializers
from .models import User
from .models import BlogPost

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class BlogPostSerializer(serializers.ModelSerializer):
    author=serializers.StringRelatedField(read_only=True)

    class Meta:
        model=BlogPost
        fields=['id','author','title','content','created_at']
        read_only_fields=['id','author','created_at']