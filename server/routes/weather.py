from flask import Blueprint, request
import requests
from datetime import datetime, timedelta
import json

weatherBlueprint = Blueprint('weather', __name__)
headers = {"User-Agent": "weather EiT app"}


def getNextHour(datetimeObject):
    return (datetimeObject.replace(microsecond=0, second=0, minute=0) + timedelta(hours=1)).isoformat() + "Z"


@weatherBlueprint.route('/temperature/now', methods = ['GET'])
def temperature_now():
    req = requests.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.419710&lon=10.401690', headers=headers)
    if req.status_code == 200:
        weather_data = req.json()['properties']['timeseries']
        nextHour = getNextHour(datetime.now())
        temperature_now = [x['data'] for x in weather_data if x['time'] == nextHour][0]
        return json.dumps({
            'temperature': temperature_now['instant']['details']['air_temperature'],
            'time': nextHour
            })
    else:
        return str(req.status_code) + "reason from met api: " + req.reason

@weatherBlueprint.route('/weather/coordinates', methods = ['GET'])
def weather():
    time = request.args.get('time')
    lat = request.args.get('lat')
    lon = request.args.get('lat')
    if time:
        time = datetime.strptime(time, '%Y-%m-%d %H:%M:%S')
    else:
        time = datetime.now()
    if not lat or not lon:
        return "Missing latitude and/or longitude", 400

    req = requests.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={}&lon={}'.format(lat, lon), headers=headers)
    if req.status_code == 200:
        weather_data = req.json()['properties']['timeseries']
        nextHour = getNextHour(datetime.now())
        weather = [x for x in weather_data if x['time'] == nextHour][0]
        return json.dumps(weather)
    else:
        return str(req.status_code) + "reason from met api: " + req.reason