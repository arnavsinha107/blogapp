from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    bio=models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.username

    

class BlogPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField()
    subcontent = models.TextField(blank=True, null=True)
    quotation = models.TextField(blank=True, null=True)
    comments_count = models.IntegerField(default=1)
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.FileField(upload_to='blog_images/', default='', blank=True, null=True, max_length=500)
    
    def __str__(self):
        return self.title