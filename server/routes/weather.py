from flask import Blueprint
import requests
from datetime import datetime, timedelta
import json


weatherBlueprint = Blueprint('weather', __name__)

@weatherBlueprint.route('/temperature', methods = ['GET'])
def temperature_now():
    weather_data = requests.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.419710&lon=10.401690').json()['properties']['timeseries']
    nextHour = datetime.now().replace(microsecond=0, second=0, minute=0) + timedelta(hours=1)
    temperature_now = [x['data'] for x in weather_data if datetime.fromisoformat((x['time']).replace("T", " ").replace("Z", "")) == nextHour][0]
    #temperature_now['time'] = now.isoformat()
    return json.dumps({
        'temperature': temperature_now['instant']['details']['air_temperature'],
        'time': nextHour.isoformat()
        })