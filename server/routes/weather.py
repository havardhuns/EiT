from flask import Blueprint
import requests
import pandas as pd
from datetime import datetime, timedelta
import json


weather_report = Blueprint('weather_report', __name__)

@weather_report.route('/weather')
def weather_now():
    weather_data = requests.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.419710&lon=10.401690').json()['properties']['timeseries']
    now = datetime.now().replace(microsecond=0, second=0, minute=0) + timedelta(hours=1)
    temperature_now = [x<['data'] for x in weather_data if datetime.fromisoformat((x['time']).replace("T", " ").replace("Z", "")) == now][0]
    temperature_now['time'] = now.isoformat()
    return temperature_now