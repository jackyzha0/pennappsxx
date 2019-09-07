from flask import Flask
from flask_restplus import Api

from client_handlers import Status, Command
from drone_handlers import Fetch, Info

app = Flask(__name__)
api = Api(app)

api.add_resource(Status, '/status')
api.add_resource(Command, '/command')
api.add_resource(Fetch, '/fetch')
api.add_resource(Info, '/info/1')

if __name__ == "__main__":
  app.run()
