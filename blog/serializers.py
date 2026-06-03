from rest_framework import serializers
from .models import User, BlogPost, Comment

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value.lower()

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author_name', 'content', 'created_at', 'is_visible']
        read_only_fields = ['id', 'created_at', 'is_visible']


class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    comments_count = serializers.SerializerMethodField()

    class Meta:
         model = BlogPost
         fields = ['id', 'author', 'title', 'subtitle', 'content', 'subcontent', 'quotation', 'comments', 'comments_count', 'is_public', 'created_at', 'image', 'category']
         read_only_fields = ['id', 'author', 'created_at', 'comments', 'comments_count']

    def get_comments_count(self, obj):
        return obj.comments.filter(is_visible=True).count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            image_str = str(instance.image)
            if image_str.startswith('http://') or image_str.startswith('https://'):
                representation['image'] = image_str
        return representation