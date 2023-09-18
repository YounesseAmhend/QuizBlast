from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    
    # API routes
    path("auth", views.is_authenticated, name="auth"),
    # route to add new quiz
    path("new", views.add_quiz, name="add"),
    # route to view all the quizez
    path("quiz", views.quizs, name="quizs"),
    # route to add question
    path("question", views.add_question, name="add_question"),
    # route to get quiz
    path("q/<int:id>", views.quiz_id, name="quiz_id"),
    
    path("quiz/<int:id>", views.display_quiz, name="display_quiz"),
    
    path("user/username", views.get_username, name="username"),
    
    path("user/<int:id>", views.get_user_quizs, name="user_quizs"),
    
    #searching
    
    path("user/search", views.search_user, name="user_search"),
    
    path("quiz/search", views.search_quiz, name="user_search"),
    
    path("quiz/autocomplete", views.autocomplete_quiz, name="quiz_autocomplete"),
    
    #catogories
    
    path("category", views.categories, name="catogories"),
    path("category/<int:id>", views.category, name="catogories")
]
