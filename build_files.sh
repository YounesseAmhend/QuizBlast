echo "BUILD START"


python3 -m pip install -r requirements.txt
# Set MySQL/MariaDB configuration
export MYSQL_CONFIG=mysql_config

python3 manage.py collectstatic --noinput --clear

echo "BUILD END"