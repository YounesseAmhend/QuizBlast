from django.db import models
from django.contrib.auth.models import AbstractUser

# models
class User(AbstractUser):
    pass

# quiz have many questions
class Quiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_post', null=False)
    name = models.TextField(blank=True, null=False)
    def serialize(self):
        return {
            "id":self.id,
            "name": self.name,
            "username": self.user.username,
        }
    
# question have many options
class Question(models.Model):
    content = models.TextField(blank=True, null=False)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='user_post', null=False)
    score = models.IntegerField(null=True)
    def serialize(self):
        return {
            "id":self.id,
            "content": self.content,
            "score": 1,
        }

class Option(models.Model):
    content = models.TextField(blank=True, null=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='user_post', null=False)
    correct = models.BooleanField(null=False)
    option_type = models.CharField(max_length=10,default="RADIO")
    
    def serialize(self):
        return {
            "id":self.id,
            "content": self.content,
            "option_type": self.option_type,
            "correct": self.correct
        }

    