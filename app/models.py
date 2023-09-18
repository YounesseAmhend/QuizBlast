from django.db import models
from django.contrib.auth.models import AbstractUser

# models
class User(AbstractUser):
    is_guest = models.BooleanField(default=False)
    
    def search_user(self):
        return {
            "id":self.id,
            "username": self.username,
        }
        
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True,null=False)
    description =  models.TextField(unique=True, null=False, default="")
    
    def __str__(self):                
        return f"{self.name} ({self.id})" 
    
    def serialize(self):
        return {
            "id" : self.id,
            "name" : self.name,
            # "description" : self.description
        }
        
# quiz have many questions
class Quiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_post', null=False)
    name = models.TextField(blank=True, null=False)
    categorie = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, default=1)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    
    def serialize(self):
        return {
            "id":self.id,
            "userId": self.user.id,
            "name": self.name,
            "username": self.user.username,
        }
    def search_serialize(self):
        return {
            "id":self.id,
            "name": self.name,
        }
    def __str__(self):                
        return f"{self.name} ({self.id})" 
    
# question have many options
class Question(models.Model):
    content = models.TextField(blank=True, null=False)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='user_post', null=False)
    
    timer = models.IntegerField(default=0, null=True)
    score = models.IntegerField(null=True)
    information = models.TextField(blank=True, null=True, default="")
    
    def serialize(self):
        return {
            "id":self.id,
            "content": self.content,
            "timer" : self.timer,
            "score": 1,
            "quote": self.information,
        }
        
        
    def __str__(self):                
        return self.content
    
class Option(models.Model):
    content = models.TextField(blank=True, null=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='user_post', null=False)
    correct = models.BooleanField(null=False)
    option_type = models.CharField(max_length=10,default="RADIO")
    
    def __str__(self):                
        return f"{self.name} ({self.id})" 
     
    def serialize(self):
        return {
            "id":self.id,
            "content": self.content,
            "option_type": self.option_type,
            "correct": self.correct
        }