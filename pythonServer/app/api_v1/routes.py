from flask import Flask, jsonify, request
from flask_restplus import Resource

from . import api


class Status(Resource):
    def get(self):
        return {
            "status": "Up and running"
        }, 200

class Command(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        cmd = json_data['command']
        print("command is: ", cmd)

        # TODO: forward this command to the drone proxy
        return {
            "result": "OK"
        }, 200

api.add_resource(Status, '/status')
api.add_resource(Command, '/command')
