from flask import jsonify, redirect

MSG_ERR_VALIDATE = 'Request validation error'
MSG_ERR_REQUEST_PARAM = 'Request parameters are invalid'
MSG_ERR_ILLEGAL_ARGUMENT = 'Arguments are invalid'
MSG_ERR_PERMISSION = 'Insufficient permissions'
MSG_ERR_CSV_FILE = 'Invalid CSV file'
MSG_ERR_FILE_NOT_ACCEPTED = 'File not accepted'
MSG_ERR_CONFLICT_RESOURCE = 'Resource already exists'
MSG_ERR_SYSTEM = 'System Error'
MSG_ERR_DATA_NOT_FOUND = 'Resource not found'
MSG_ERR_USER_NOT_SAME_ORGANIZATION = 'User is not in the current organization'
MSG_ERR_BAD_REQUEST = 'Bad Request'
MSG_ERR_MISSING_AUTH_HEADER = 'Missing Authorization Header'
MSG_ERR_UNAUTHENTICATED = 'Unauthenticated'


class ErrorResponse(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        response = dict()
        response['message'] = self.message
        response['status_code'] = self.status_code
        if self.payload is not None:
            response['data'] = self.payload
        return response


class ConflictResourceError(ErrorResponse):
    def __init__(self, message=None, payload=None):
        ErrorResponse.__init__(self, message)
        self.message = f'{MSG_ERR_CONFLICT_RESOURCE}: {message}' if message is not None else MSG_ERR_CONFLICT_RESOURCE
        self.status_code = 409
        self.payload = payload


class IllegalArgumentException(ErrorResponse):
    def __init__(self, message=None, payload=None):
        ErrorResponse.__init__(self, message)
        self.message = f'{MSG_ERR_ILLEGAL_ARGUMENT}: {message}' if message is not None else MSG_ERR_ILLEGAL_ARGUMENT
        self.status_code = 400
        self.payload = payload


def unauthorized():
    return jsonify({'message': MSG_ERR_MISSING_AUTH_HEADER}), 401


def unauthenticated():
    return jsonify({'message': MSG_ERR_UNAUTHENTICATED}), 401


def not_found(msg=''):
    msg = MSG_ERR_DATA_NOT_FOUND if not msg else msg
    return jsonify({'message': msg}), 404


def bad_request(msg='', error_code=400):
    msg = MSG_ERR_BAD_REQUEST if not msg else msg
    return jsonify({'message': msg}), error_code


def validation_error(msg=''):
    return jsonify({'message': (MSG_ERR_VALIDATE + ' {}'.format(msg)).strip()}), 400


def conflict_resource(error):
    return jsonify(error.to_dict()), 409


def error_permission():
    return jsonify({'message': MSG_ERR_PERMISSION}), 403


def error_system(msg=''):
    return jsonify({'message': (MSG_ERR_SYSTEM + ' {}'.format(msg)).strip()}), 500


def response_success(data):
    return jsonify({'data': data}), 200


def redirect_success(redirect_url):
    return redirect(redirect_url), 302


def delete_success():
    return jsonify({'message': 'OK'}), 200
