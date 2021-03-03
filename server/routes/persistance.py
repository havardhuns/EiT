from flask import Blueprint, request
from firebase import firebase #If wierd firebase error, do: pip install git+https://github.com/ozgur/python-firebase
import sys #For debugging

persistanceBlueprint = Blueprint('persistance', __name__)
headers = {"User-Agent": "weather EiT app"}

firebase = firebase.FirebaseApplication('https://veikvalitet-persistance-default-rtdb.firebaseio.com/', None)


@persistanceBlueprint.route('/persistance', methods = ['POST'])
def storeRoute():
    data = request.get_json() #Request form: {"start": 123, "end": 456}

    # sys.stdout.flush()
    # print(data, file=sys.stdout)
    # sys.stdout.flush()

    result = firebase.post('/roadRoutes', data, {'print': 'pretty'}, {'X_FANCY_HEADER': 'VERY FANCY'}) #Returns generated string ID of route
    return result
    



@persistanceBlueprint.route('/persistance', methods = ['GET'])
def getRoute():
    routeId = request.args.get('id')
    result = firebase.get("/roadRoutes", routeId)
    return str(result)


#@persistanceBlueprint.route('/persistance', methods = ['DELETE'])