from flask import request
from flask_restplus import Resource

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
            "result": "OK"
            "job_id": job_id
        }, 200


