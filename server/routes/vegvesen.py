from flask import Blueprint, request
import json
import requests
import xml.etree.ElementTree as ET
import sys #For debugging
from math import sin, cos, sqrt, atan2, radians

vegvesenBlueprint = Blueprint('vegvesen', __name__)
headers = {"User-Agent": "weather EiT app"}


@vegvesenBlueprint.route('/vegvesen', methods = ['POST'])
def getTrafficSituations():
    data = request.get_json()
    #data2 = request.get_data()

    sys.stdout.flush()
    print("FLASK VEGVESEN REQUEST:", file=sys.stdout)
    print("REQUEST DATA: " + str(data), file=sys.stdout)
    #print("REQUEST DATA: " + str(data2), file=sys.stdout)
    sys.stdout.flush()

    req = requests.get('https://www.vegvesen.no/ws/no/vegvesen/veg/trafikkpublikasjon/trafikk/2/GetSituation', auth=("TjeDatexEiT", "zQNZseNimpy8JhPNCsB4"))
    if req.status_code == 200:
        sys.stdout.flush()
        print("VEGVESEN SUCCESS!!************", file=sys.stdout)
        sys.stdout.flush()

        root = ET.fromstring(req.content)

        #Making a list of traffic situations with coordinates and comment
        situations = []
        for situation in root.findall("{http://datex2.eu/schema/2/2_0}payloadPublication/{http://datex2.eu/schema/2/2_0}situation"):
            situationInfo = []
            commentElement = situation.find("{http://datex2.eu/schema/2/2_0}situationRecord/{http://datex2.eu/schema/2/2_0}generalPublicComment/{http://datex2.eu/schema/2/2_0}comment/{http://datex2.eu/schema/2/2_0}values/{http://datex2.eu/schema/2/2_0}value")
            latitudeElement = situation.find("{http://datex2.eu/schema/2/2_0}situationRecord/{http://datex2.eu/schema/2/2_0}groupOfLocations/{http://datex2.eu/schema/2/2_0}locationForDisplay/{http://datex2.eu/schema/2/2_0}latitude")
            longitudeElement = situation.find("{http://datex2.eu/schema/2/2_0}situationRecord/{http://datex2.eu/schema/2/2_0}groupOfLocations/{http://datex2.eu/schema/2/2_0}locationForDisplay/{http://datex2.eu/schema/2/2_0}longitude")
            #value = "kom: " + commentElement.text + " Lat: " + latitudeElement.text + " Long: " + longitudeElement.text
            situationInfo.append(commentElement.text)
            situationInfo.append(latitudeElement.text)
            situationInfo.append(longitudeElement.text)

            situations.append(situationInfo)


        #Now compare the situations coordinates with the route coordinate points
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

                a = sin(dlat / 2)**2 + cos(routeLat) * cos(sitLat) * sin(dlon / 2)**2
                c = 2 * atan2(sqrt(a), sqrt(1 - a))

                distance = R * c #kilometers

                #If the route is within the range of a traffic situation, return the situation
                if(distance < 0.5):
                    trafficWarnings.append(situation[0])
        

        return json.dumps(str(trafficWarnings))
        #return '{"backend response": "' + str(result) + '"}'
        #return '{"backend response": "FROM BACKEND REQUEST RECEIVED"}'
    else:
        return str(req.status_code) + "FROM BACKEND: reason: " + req.reason



@vegvesenBlueprint.route('/vegvesentest', methods = ['GET'])
def getTrafficSituationstest():

    req = requests.get('https://www.vegvesen.no/ws/no/vegvesen/veg/trafikkpublikasjon/trafikk/2/GetSituation', auth=("TjeDatexEiT", "zQNZseNimpy8JhPNCsB4"))
    if req.status_code == 200:
        sys.stdout.flush()
        print("VEGVESEN SUCCESS!!************", file=sys.stdout)
        sys.stdout.flush()


        root = ET.fromstring(req.content)
        result = "XML PARSE OUTPUT:" + "<p>"
        for child in root:
            result = result + str(child.tag) + "<p>"
            for grandchild in child:
                result = result + "---" + str(grandchild.tag) + "<p>"

        #Making a list of traffic situations with coordinates and comment
        situations = []
        for situation in root.findall("{http://datex2.eu/schema/2/2_0}payloadPublication/{http://datex2.eu/schema/2/2_0}situation"):
            situationInfo = []
            commentElement = situation.find("{http://datex2.eu/schema/2/2_0}situationRecord/{http://datex2.eu/schema/2/2_0}generalPublicComment/{http://datex2.eu/schema/2/2_0}comment/{http://datex2.eu/schema/2/2_0}values/{http://datex2.eu/schema/2/2_0}value")
            latitudeElement = situation.find("{http://datex2.eu/schema/2/2_0}situationRecord/{http://datex2.eu/schema/2/2_0}groupOfLocations/{http://datex2.eu/schema/2/2_0}locationForDisplay/{http://datex2.eu/schema/2/2_0}latitude")
            longitudeElement = situation.find("{http://datex2.eu/schema/2/2_0}situationRecord/{http://datex2.eu/schema/2/2_0}groupOfLocations/{http://datex2.eu/schema/2/2_0}locationForDisplay/{http://datex2.eu/schema/2/2_0}longitude")
            #value = "kom: " + commentElement.text + " Lat: " + latitudeElement.text + " Long: " + longitudeElement.text
            situationInfo.append(commentElement.text)
            situationInfo.append(latitudeElement.text)
            situationInfo.append(longitudeElement.text)

            situations.append(situationInfo)

        #Now fetch the route coordinates

        #Now compare the situations coordinates with the route coordinate points

        return json.dumps(str(situations))

        #return json.dumps(str(result))
        #return '{"backend response": "' + str(result) + '"}'
        #return '{"backend response": "FROM BACKEND REQUEST RECEIVED"}'
    else:
        return str(req.status_code) + "FROM BACKEND: reason: " + req.reason

    
