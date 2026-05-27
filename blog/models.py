from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    bio=models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.username

    

class BlogPost(models.Model):
    author =models.ForeignKey(User, on_delete=models.CASCADE)
    title=models.CharField(max_length=255)
    content=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    image=models.FileField(upload_to='blog_images/', default='')
    
    def __str__(self):
        return self.title