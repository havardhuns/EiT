from flask import Blueprint, request
import json
import requests
import xml.etree.ElementTree as ET
import sys #For debugging

vegvesenBlueprint = Blueprint('vegvesen', __name__)
headers = {"User-Agent": "weather EiT app"}


@vegvesenBlueprint.route('/vegvesen', methods = ['POST'])
def getTrafficSituations():
    data = request.get_json()
    data2 = request.get_data()

    sys.stdout.flush()
    print("FLASK VEGVESEN REQUEST:", file=sys.stdout)
    print("REQUEST DATA: " + str(data), file=sys.stdout)
    print("REQUEST DATA: " + str(data2), file=sys.stdout)
    sys.stdout.flush()

    req = requests.get('https://www.vegvesen.no/ws/no/vegvesen/veg/trafikkpublikasjon/trafikk/2/GetSituation', auth=("TjeDatexEiT", "zQNZseNimpy8JhPNCsB4"))
    if req.status_code == 200:
        sys.stdout.flush()
        print("VEGVESEN SUCCESS!!************", file=sys.stdout)
        sys.stdout.flush()


        root = ET.fromstring(req.content)
        #result = "XML parsing:" + "\n"
        result = "XML PARSE OUTPUT:" + "\n"
        for child in root:
            result = result + str(child.tag) + str(child.attrib)


        return '{"response": "FROM BACKEND REQUEST RECEIVED"}'
    else:
        return str(req.status_code) + "FROM BACKEND: reason: " + req.reason

    
