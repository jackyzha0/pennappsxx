import os
import uuid
import datetime
from flask import Flask, request
from flask_restplus import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS

api = Api(app)
db = SQLAlchemy(app)

VALID_FLIGHT_PLANS = ['CONE', 'LINE']

# DB Stuff ----------------------------
class JobQueue(db.Model):
    __tablename__  = 'job_queue'
    job_id =                db.Column(db.String(20), primary_key=True)
    flight_plan =           db.Column(db.String(20), nullable=False)

class Jobs(db.Model):       # historical record of jobs
    __tablename__ = 'jobs'
    job_id =                db.Column(db.String(20), primary_key=True)
    flight_plan =           db.Column(db.String(20), nullable=False)
    job_created_date =      db.Column(db.DateTime, default=datetime.datetime.utcnow)

class DroneStatus(db.Model):
    __tablename__ = 'drone_status'
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
        status = DroneStatus.query.all()
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

        job_id = str(uuid.uuid4()) # randomly generate uuid

        # add to job history
        job = Jobs(job_id=job_id, flight_plan=flight_plan)
        db.session.add(job)
        db.session.commit()

        # add to job queue
        job_queue_entry = JobQueue(job_id=job_id, flight_plan=flight_plan)
        db.session.add(job_queue_entry)
        db.session.commit()

        return {
            "result": "OK",
            "job_id": job_id
        }, 200

class RecentJobs(Resource):
    '''
        Dashboard queries for the recent 10 jobs
    '''
    def get(self):
        result = []
        jobs = Jobs.query.limit(10).all()
        for j in jobs:
            result.append({
                job_id: j.job_id,
                flight_plan: j.flight_plan,
                job_created_date: j.job_created_date
            })

        return {
            "result": "OK",
            "recentJobs": result
        }, 200


# Drone Stuff ----------------------------
class Fetch(Resource):
    '''
        Drone polls this endpoint while in an idle state
        - True if client clicked deploy, send the flight plan code
        - False otherwise
    '''
    def get(self):
        # queue_length = JobQueue.count()
        queue_length = JobQueue.query.count()
        if queue_length == 0:
            return {
                "result": "OK",
                "status": False,
                "job_id": "",
                "flight_plan": ""
            }, 200

        # get the next job in the queue, and start it
        job = JobQueue.query.limit(1).all()
        job_id = job[0].job_id
        flight_plan= job[0].flight_plan
        print("DEBUG2:", job[0])
        db.session.delete(job[0])
        db.session.commit()

        return {
            "result": "OK",
            "status": True,
            "job_id": job_id,
            "flight_plan": flight_plan
        }, 200


class Info(Resource):
    '''
        Dashboard queries for drone status
    '''
    def get(self):
        return {
            "result": "OK"
        }, 200

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

        status = DroneStatus(drone_id, model, job_id, active, battery, flight_time, speed)
        db.session.add(status)
        db.session.commit()

        print('DEBUG:', drone_id, model, job_id, active, battery, flight_time, speed)
        return {
            "result": "OK"
        }, 200

api.add_resource(Status, '/status')
api.add_resource(Command, '/command')
api.add_resource(RecentJobs, '/jobs')
api.add_resource(Fetch, '/fetch')
api.add_resource(Info, '/info')

if __name__ == "__main__":
  app.run()
