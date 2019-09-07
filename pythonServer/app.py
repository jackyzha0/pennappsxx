from flask import Flask, jsonify, request
from flask_restplus import Api, Resource

app = Flask(__name__)
api = Api(app)

# Dashboard Endpoints ---------------------------
class Status(Resource):
    def get(self):
        return {
            "status": "Up and running"
        }, 200

class Command(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        cmd = json_data['command']
        print("commando is: ", cmd)
        # TODO: generate job_id
        # TODO: forward this command to the drone proxy
        return {
            "result": "OK"
        }, 200


# Drone Endpoints ---------------------------
class Fetch(Resource):
    '''
        Drone polls this endpoint while in an idle state
        - True if client clicked deploy
        - False otherwise
    '''
    status = True
    def get(self):
        return {
            "result": "OK",
            "status": True,
            "job_id": 1
        }, 200

class Info(Resource):
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
