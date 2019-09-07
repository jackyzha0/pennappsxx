import os
import uuid
import datetime
from flask import Flask, request
from flask_restplus import Api, Resource
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS

api = Api(app)
db = SQLAlchemy(app)

VALID_FLIGHT_PLANS = ['CONE', 'LINE']
JOB_QUEUE = [] # a temporary cache of pending jobs

# DB Stuff ----------------------------
class Jobs(db.Model):
    __tablename__ = 'jobs'
    job_id =                db.Column(db.String(20), primary_key=True)
    flight_plan =           db.Column(db.String(20), nullable=False)
    job_created_date =      db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Status(db.Model):
    __tablename__ = 'status'
    drone_id =              db.Column(db.Integer, primary_key=True)
    job_id =                db.Column(db.String(20), nullable=False)
    model =                 db.Column(db.String(50), nullable=False)
    active =                db.Column(db.Boolean, default=False)
    battery =               db.Column(db.Float, default=0.0)
    flight_time =           db.Column(db.Float, default=0.0)
    speed =                 db.Column(db.Float, default=0.0)
    last_updated_date =     db.Column(db.DateTime, default=datetime.datetime.utcnow)

# Dashboard Stuff ---------------------
class Status(Resource):
    '''
        Dashboard continuously checks up on the status of each drone
    '''
    def get(self):
        result = []
        status = Status.query.all()
        for s in status:
            result.append({
                drone_id: s.drone_id,
                model: s.model,
                active: s.active,
                battery: s.battery,
                flight_time: s.flight_time,
                speed: s.speed
            })

        return {
            "result": "OK",
            "status": result
        }, 200


class Command(Resource):
    '''
        Dashboard submits a flight plan to initiate drone mission.
        - returns the job_id
    '''

    def post(self):
        json_data = request.get_json(force=True)
        flight_plan = json_data['flight_plan']

        if flight_plan not in VALID_FLIGHT_PLANS:
            return {
                "result": "error"
            }, 400

        job_id = uuid.uuid4() # randomly generate uuid
        job = Jobs(job_id, flight_plan)
        db.session.add(job)
        db.session.commit()

        JOB_QUEUE.append({ job_id, flight_plan })
        print("DEBUG:", JOB_QUEUE)

        return {
            "result": "OK",
            "job_id": job_id
        }, 200

# Drone Stuff ----------------------------
class Fetch(Resource):
    '''
        Drone polls this endpoint while in an idle state
        - True if client clicked deploy, send the flight plan code
        - False otherwise
    '''
    def get(self):

        if len(JOB_QUEUE) == 0:
            return {
                "result": "OK",
                "status": False,
                "job_id": 0,
                "flight_plan": ""
            }, 200

        job = JOB_QUEUE.pop(0)
        print("DEBUG:", JOB_QUEUE)

        return {
            "result": "OK",
            "status": True,
            "job_id": job.job_id,
            "flight_plan": job.flight_plan
        }, 200


class Info(Resource):
    '''
        Drone continuously updates server with its info
    '''
    def post(self):
        json_data =     request.get_json(force=True)
        drone_id =      json_data['drone_id']
        model =         json_data['model']
        job_id =        json_data['job_id']
        active =        json_data['active']
        battery =       json_data['battery']
        flight_time =   json_data['flight_time']
        speed =         json_data['speed']

        status = Status(drone_id, model, job_id, active, battery, flight_time, speed)
        db.session.add(status)
        db.session.commit()

        print('DEBUG:', drone_id, model, job_id, active, battery, flight_time, speed)
        return {
            "result": "OK"
        }, 200

api.add_resource(Status, '/status')
api.add_resource(Command, '/command')
api.add_resource(Fetch, '/fetch')
api.add_resource(Info, '/info/1')

if __name__ == "__main__":
  app.run()
