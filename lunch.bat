@echo off
start "Git Bash - my-app" "bash.exe" -c "cd my-app && npm start"
start "Git Bash - manage.py" "bash.exe" -c "python manage.py runserver"
