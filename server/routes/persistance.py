from flask import Blueprint, request
# If wierd firebase error, do: pip install git+https://github.com/ozgur/python-firebase
from firebase import firebase
import sys  # For debugging

persistanceBlueprint = Blueprint('persistance', __name__)
headers = {"User-Agent": "weather EiT app"}

firebase = firebase.FirebaseApplication(
    'https://veikvalitet-persistance-default-rtdb.firebaseio.com/', None)


@persistanceBlueprint.route('/persistance', methods=['POST'])
def storeRoute():
    data = request.get_json()  # Request form: {"start": 123, "end": 456}

    # sys.stdout.flush()
    # print(data, file=sys.stdout)
    # sys.stdout.flush()

    # Returns generated string ID of route
    result = firebase.post(
        '/roadRoutes', data, {'print': 'pretty'}, {'X_FANCY_HEADER': 'VERY FANCY'})
    return result


@persistanceBlueprint.route('/persistance', methods=['GET'])
def getRoute():
    routeId = request.args.get('id')
    result = firebase.get("/roadRoutes", routeId)
    return str(result)


# @persistanceBlueprint.route('/persistance', methods = ['DELETE'])
