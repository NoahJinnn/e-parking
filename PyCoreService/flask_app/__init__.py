import logging
import os
import traceback

from flasgger import Swagger
from flask import Flask, request

from flask_app.api import devices_mod, parks_mod
from flask_app.utils import response_helper
from flask_cors import CORS

# Set up logging
logging.basicConfig()
LOGGER = logging.getLogger(__name__)
LOGGER.setLevel(logging.INFO)

if os.environ.get('DEBUG'):
    LOGGER.setLevel(logging.DEBUG)

LOGGER.propagate = True

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app, resources={r"": {"origins": "*"}})

app.logger.info('Initializing Flask and importing API modules')

app.config['SWAGGER'] = {
    "title": "ePG APIs docs",
    "swagger_version": "3.0",
    "specs_route": "/apidocs",
    "uiversion": 3
}

swagger = Swagger(
    app,
    template_file=os.path.join(ROOT_DIR, 'api', 'v1', 'swagger_doc', 'template.yml'),
    parse=True
)

# Register endpoints
app.register_blueprint(devices_mod, url_prefix='/devices')
app.register_blueprint(parks_mod, url_prefix='/parks')


@app.errorhandler(403)
def error_permission(error):
    app.logger.info(error)
    return response_helper.error_permission()


@app.errorhandler(404)
def resource_not_found(error):
    app.logger.info(error)
    return response_helper.not_found(error.description)


@app.errorhandler(400)
def bad_request(error):
    app.logger.info(error)
    return response_helper.bad_request(error.description)


@app.errorhandler(405)
def method_not_allowed(error):
    app.logger.info(error)
    return response_helper.bad_request(error.description, error_code=405)


@app.errorhandler(response_helper.ConflictResourceError)
def conflict_resource(error):
    app.logger.info(error)
    return response_helper.conflict_resource(error)


@app.errorhandler(response_helper.IllegalArgumentException)
def handle_error_response(error):
    app.logger.info(error)
    return response_helper.validation_error(error)


@app.errorhandler(Exception)
def handle_error(error):
    stack_trace_string = traceback.format_exc()
    error_message = f'{error} -- {stack_trace_string}'
    app.logger.exception(error_message)
    return response_helper.error_system()


@app.route('/health', methods=['GET'])
def dummy_endpoint():
    return response_helper.response_success('Server running')


@app.before_request
def before_request_handler():
    """
    Check user context before each request
    :return:
    """
    LOGGER.debug(f'Handling method: {request.method} and path: {request.path}')
