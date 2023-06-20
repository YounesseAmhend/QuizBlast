from json import loads
from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from .models import *
from time import sleep

# Create your views here.
def index(request):
    return render(request, "index.html")

@csrf_exempt
@login_required
def add_quiz(request):
    if request.method == 'POST':
        data = loads(request.body)
        if data.get("name") == "":
            return JsonResponse({"error":"a post should have some text on it"}, status=400)
        quiz = Quiz.objects.create(user=request.user, name=data.get("name"))
        return JsonResponse({
            "message":"Success",
            "quiz_id":quiz.id,
        }, status=201)
    elif request.method == 'PUT':
        data = loads(request.body)
        if data.get("name") == "":
            return JsonResponse({"error":"a post should have some text on it"}, status=400)
        quiz = Quiz.objects.get(id=data.get("quiz_id"))
        quiz.name = data.get("name")
        return JsonResponse({
            "message":"Success",
        }, status=200)

@csrf_exempt
@login_required
def add_question(request):
    if request.method == "GET":
        return render(request, "index.html")
    elif request.method == "POST":
        data = loads(request.body)
        
        if data.get("content") == "":
            return JsonResponse({"error":"a Question should have some content"}, status=400)
        
        quiz = Quiz.objects.get(pk=data.get("quiz_id"))
        question = Question.objects.create(content=data.get("content"),timer = data.get("timer"),quiz=quiz)
        
        for option in data.get("option"):
            Option.objects.create(content=option["text"], correct=option["correct"], question=question)
            
        return JsonResponse({
            "message":"Success",
            "question_id":question.id,
            }, status=201)
        
    elif request.method == "PUT":
        data = loads(request.body)
        if data.get("content") == "":
            return JsonResponse({"error":"a Question should have some content"}, status=400)
        question = Question.objects.get(pk = data.get("question_id"))
        question.content = data.get("content")
        question.timer = data.get("timer")
        
        question.save()
        Option.objects.filter(question=question).delete()
        for option in data.get("options"):
            Option.objects.create(content=option["text"], correct=option["correct"], question=question)
        return JsonResponse({
            "message":"Success",
            }, status=201)

def is_authenticated(request):
    return JsonResponse({"is_authenticated":request.user.is_authenticated},safe=False)

@csrf_exempt
def quizs(request):
    if request.method == "POST":
        
        quisz = Quiz.objects.all().order_by('id')
        
        quiz_num = 20
        
        if quisz.count() % quiz_num == 0:
            total_pages = quisz.count() / quiz_num
        else:
            total_pages = int(quisz.count() / quiz_num) + 1
            
        page_number = loads(request.body).get("page_number")
        
        paginator = Paginator(quisz, quiz_num)
        quisz = paginator.get_page(page_number)
        
        if total_pages >= page_number:
            return JsonResponse([quiz.serialize() for quiz in quisz], safe=False)
        else:
            return JsonResponse({"error":"the page does not exist"}, safe=False)


def quiz_id(request, id):
    if request.method == 'GET':
        quiz = Quiz.objects.get(pk=id)
        questions = Question.objects.filter(quiz=quiz)
        fullQuest = []
        for question in questions :
            options = Option.objects.filter(question=question)
            fullQuest.append({
                "question":question.serialize(),
                "options":[option.serialize() for option in options],
                })
        return JsonResponse({"quiz":quiz.serialize(), "questions":fullQuest})
def display_quiz(request, id):
    if request.method == "GET":
        return render(request, "index.html")
# login logout register
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "register.html")
 


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

#TODO: don't forget to delete '@csrf_exempt' in build mode
@csrf_exempt
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return JsonResponse({
                "message": "Invalid username and/or password."
            }, status=401)
    else:
        return JsonResponse({
                "Login": "Successfully logged in"
        }, status=401)