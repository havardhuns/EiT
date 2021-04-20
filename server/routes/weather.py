from flask import Blueprint, request
import requests
from datetime import datetime, timedelta
import json
from functions.weatherFunctions import getNextHour
from functions.placeNameFunctions import get_placename_from_coordinates

weatherBlueprint = Blueprint('weather', __name__)
headers = {"User-Agent": "weather EiT app"}


@weatherBlueprint.route('/temperature/now', methods=['GET'])
def temperature_now():
    req = requests.get(
        'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.419710&lon=10.401690', headers=headers)
    if req.status_code == 200:
        weather_data = req.json()['properties']['timeseries']
        nextHour = getNextHour(datetime.now())
        temperature_now = [x['data']
                           for x in weather_data if x['time'] == nextHour][0]
        return json.dumps({
            'temperature': temperature_now['instant']['details']['air_temperature'],
            'time': nextHour
        })
    else:
        return str(req.status_code) + "reason from met api: " + req.reason


@weatherBlueprint.route('/weather/coordinates', methods=['GET'])
def weather():
    lat = request.args.get('lat', default=0, type=float)
    lng = request.args.get('lng', default=0, type=float)
    time = request.args.get('time', default="now", type=str)
    placeName = request.args.get('pn', default=None, type=str)
    if time == "now":
        time = datetime.now()
    else:
        time = datetime.strptime(time, '%Y-%m-%d %H:%M:%S')
    if not lat or not lng:
        return "Missing latitude and/or longitude", 400
    if not placeName:
        placeName = get_placename_from_coordinates(lat, lng)
    req = requests.get(
        'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={}&lon={}'.format(lat, lng), headers=headers)
    if req.status_code == 200:
        weather_data = req.json()['properties']['timeseries']
        nextHour = getNextHour(datetime.now())
        weather = [x for x in weather_data if x['time'] == nextHour][0]
        return json.dumps([{"type": "weather", "lat": lat, "lng": lng, "data": weather['data'], "location": placeName}])
    else:
        return str(req.status_code) + "reason from met api: " + req.reason
        
@weatherBlueprint.route('/weather/glatt/', methods = ['POST'])
def isGlatt():
    # criteria: presently about 0 degrees, precipitation; preferably also history and forecast

    data = request.get_json()

    glattList = []
    counter = 0
    for coords in data:
        if counter % 50 == 0:
            #Check weather
            req = requests.get(
            f'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={coords["lat"]}&lon={coords["lng"]}', headers=headers)
            if req.status_code == 200:
                weather_data = req.json()['properties']['timeseries']
                nextHour = getNextHour(datetime.now())
                temperature_now = [x['data']['instant']['details']['air_temperature']
                                for x in weather_data if x['time'] == nextHour][0]

                if abs(temperature_now) < 5:
                    location = get_placename_from_coordinates(coords["lat"], coords["lng"])
                    info = {"type": "glatt", "lat": coords["lat"], "lng": coords["lng"],
                            "data": "Potensielt glatt", "location": location}
                    glattList.append(info)

                #     print(f'isGlatt at ({coords["lat"]}, {coords["lng"]}), temp.: {temperature_now}')
                # print(f'not isGlatt at ({coords["lat"]}, {coords["lng"]}), temp.: {temperature_now}')
            
        counter += 1
    return json.dumps(glattList)


# def testGlatt():
#     with open(r'..\evjetrondheim.txt', 'r') as f:
#         route = json.load(f)
#         for coords in route:
#             # requests.get(f"http://localhost:5000/weather/glatt/lat/{coords['lat']}/lng/{coords['lng']}/time/now")
