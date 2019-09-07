# flask-api-minimum-boilerplate
A basic boilerplate for Flask with flask-restplus, postgresql and pytest

* Python 3.6
* Flask 0.12
* flask-restplus 0.10.1
* flask-sqlalchemy 2.3.2
* psycopg2 2.7.4
* pytest 3.0.6
* pytest-cov 2.5.1
* pytest-html 1.16.1
* pytest-sugar 0.9.1
* pylint 1.8.2
* factory_boy 2.10.0


Endpoint to send a command: http://localhost:5000/api/v1/command
This endpoint accepts a JSON payload, which you can test by running `./test.sh`
```
{
  command: "test command"
}
```

## Project Structure
  ```sh
  ├── README.md
  ├── autoapp.py
  ├── config.py
  ├── requirements.txt
  ├── app
  │   ├── __init__.py
  │   ├── models.py  
  │   └── api_v1
  │       ├── __init__.py
  │       ├── routes.py
  ```
  
## Project Setup
```
virtualenv venv -p python3
source venv/bin/activate
pip install -r requirements.txt
./run.sh
```
Point your browser/GET request to:
http://localhost:5000/api/v1/status

```
{
    status: "Up and running"
}
```
You can find the Swagger autogenerated documentation for the api/v1 here:
```
http://localhost:5000/api/v1/
```

## Deploying to Heroku (run from the root folder)
```
heroku login
heroku config:set FLASK_APP=autoapp.py --app pennappsxx-server
heroku config:set FLASK_DEBUG=1 --app pennappsxx-server
git subtree push --prefix pythonServer heroku master
```



