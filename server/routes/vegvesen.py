from flask import Blueprint, request
import json
import requests
import xml.etree.ElementTree as ET
import sys  # For debugging
from math import sin, cos, sqrt, atan2, radians
from functions.placeNameFunctions import get_placename_from_coordinates


vegvesenBlueprint = Blueprint('vegvesen', __name__)
headers = {"User-Agent": "weather EiT app"}


@vegvesenBlueprint.route('/vegvesen', methods=['POST'])
def getTrafficSituations():
    data = request.get_json()

    req = requests.get('https://www.vegvesen.no/ws/no/vegvesen/veg/trafikkpublikasjon/trafikk/2/GetSituation',
                       auth=("TjeDatexEiT", "zQNZseNimpy8JhPNCsB4"))
    if req.status_code == 200:

        root = ET.fromstring(req.content)

        # Making a list of traffic situations with coordinates and comment
        situations = []
        for situation in root.findall("{http://datex2.eu/schema/2/2_0}payloadPublication/{http://datex2.eu/schema/2/2_0}situation"):
            situationInfo = []
            commentElement = situation.find(
                "{http://datex2.eu/schema/2/2_0}situationRecord/{http://datex2.eu/schema/2/2_0}generalPublicComment/{http://datex2.eu/schema/2/2_0}comment/{http://datex2.eu/schema/2/2_0}values/{http://datex2.eu/schema/2/2_0}value")
            latitudeElement = situation.find(
                "{http://datex2.eu/schema/2/2_0}situationRecord/{http://datex2.eu/schema/2/2_0}groupOfLocations/{http://datex2.eu/schema/2/2_0}locationForDisplay/{http://datex2.eu/schema/2/2_0}latitude")
            longitudeElement = situation.find(
                "{http://datex2.eu/schema/2/2_0}situationRecord/{http://datex2.eu/schema/2/2_0}groupOfLocations/{http://datex2.eu/schema/2/2_0}locationForDisplay/{http://datex2.eu/schema/2/2_0}longitude")
            # value = "kom: " + commentElement.text + " Lat: " + latitudeElement.text + " Long: " + longitudeElement.text
            situationInfo.append(commentElement.text)
            situationInfo.append(latitudeElement.text)
            situationInfo.append(longitudeElement.text)

            situations.append(situationInfo)

        # Now compare the situations coordinates with the route coordinate points
        trafficWarnings = []
        # approximate radius of earth in km
        R = 6373.0
        for coordinate in data:
            routeLat = radians(coordinate["lat"])
            routeLon = radians(coordinate["lng"])

            for situation in situations:
                sitLat = radians(float(situation[1]))
                sitLon = radians(float(situation[2]))

                dlon = sitLon - routeLon
                dlat = sitLat - routeLat

                a = sin(dlat / 2)**2 + cos(routeLat) * \
                    cos(sitLat) * sin(dlon / 2)**2
                c = 2 * atan2(sqrt(a), sqrt(1 - a))

                distance = R * c  # kilometers

                # If the route is within the range of a traffic situation, return the situation
                if(distance < 0.5):
                    lat = float(situation[1])
                    lng = float(situation[2])
                    location = get_placename_from_coordinates(lat, lng)
                    info = {"type": "traffic", "lat": lat, "lng": lng,
                            "data": situation[0], "location": location}
                    if not any(warning["location"] == location for warning in trafficWarnings):
                        trafficWarnings.append(info)
                        
        return json.dumps(trafficWarnings)
        # return '{"backend response": "' + str(result) + '"}'
        # return '{"backend response": "FROM BACKEND REQUEST RECEIVED"}'
    else:
        return str(req.status_code) + "FROM BACKEND: reason: " + req.reason
