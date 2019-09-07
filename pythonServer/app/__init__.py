import logging

from flask import Flask

from app.api_v1 import api_v1 as api_v1_blueprint
from app.models import db
from config import config


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def create_app(env, additional_settings={}):
    logger.info('Environment in __init__: "%s"', env)
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config[env])

    config[env].init_app(app)
    app.config.update(additional_settings)

    db.init_app(app)

    # Blueprints
    app.register_blueprint(api_v1_blueprint, url_prefix='/api/v1')

    return app

