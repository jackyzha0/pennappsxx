from flask import Flask, jsonify, request
from flask_restplus import Api, Resource

class Fetch(Resource):
    '''
        Drone polls this endpoint while in an idle state
        - True if client clicked deploy, send the flight plan code
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


