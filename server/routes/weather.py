from flask import Blueprint
import requests
from datetime import datetime, timedelta
import json


weatherBlueprint = Blueprint('weather', __name__)

@weatherBlueprint.route('/temperature', methods = ['GET'])
def temperature_now():
    headers = {"User-Agent": "weather EiT app"}
    req = requests.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.419710&lon=10.401690', headers=headers)
    if req.status_code == 200:
        weather_data = req.json()['properties']['timeseries']
        nextHour = (datetime.now().replace(microsecond=0, second=0, minute=0) + timedelta(hours=1)).isoformat() + "Z"
        temperature_now = [x['data'] for x in weather_data if x['time'] == nextHour][0]
        return json.dumps({
            'temperature': temperature_now['instant']['details']['air_temperature'],
            'time': nextHour
            })
    else:
        return str(req.status_code) + req.reason