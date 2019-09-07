from flask import Flask, jsonify, request
from flask_restplus import Api, Resource

app = Flask(__name__)
api = Api(app)

VALID_FLIGHT_PLANS = ['CONE', 'LINE']

# Dashboard Endpoints ---------------------------
class Status(Resource):
    '''
        Dashboard continuously checks up on the status of each drone
    '''
    def get(self):
        return {
            "result": "OK",
            "status": [
                { drone_id: 1, model: 'TELLO EDU 1', active: False, battery: 0.5,
                 flight_time: 0, speed: 0},
                { drone_id: 2, model: 'TELLO EDU 2', active: False, battery: 0.5,
                 flight_time: 0, speed: 0},
                { drone_id: 3, model: 'TELLO EDU 3', active: False, battery: 0.5,
                 flight_time: 0, speed: 0}
            ]
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

        job_id = 1
        # TODO: generate job_id
        # TODO: forward this command to the drone proxy
        return {
            "result": "OK",
            "job_id": job_id
        }, 200


# Drone Endpoints ---------------------------
class Fetch(Resource):
    '''
        Drone polls this endpoint while in an idle state
        - True if client clicked deploy
        - False otherwise
    '''
    def get(self):
        status = True
        job_id = 1
        flight_plan = "CONE"

        return {
            "result": "OK",
            "status": status,
            "job_id": job_id,
            "flight_plan": flight_plan
        }, 200


class Info(Resource):
    '''
        Drone continuously updates server with its info
    '''
    def post(self):
        json_data = request.get_json(force=True)
        job_id = json_data['job_id']
        active = json_data['active']
        battery = json_data['battery']
        flight_time = json_data['flight_time']
        speed = json_data['speed']

        return {
            "result": "OK"
        }, 200


api.add_resource(Status, '/status')
api.add_resource(Command, '/command')
api.add_resource(Fetch, '/fetch')
api.add_resource(Info, '/info/1')

if __name__ == "__main__":
  app.run()
