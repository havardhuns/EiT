from flask import Blueprint, request
import googlemaps
from datetime import datetime
import json


googlemapsBlueprint = Blueprint('googlemaps', __name__)


gmaps = googlemaps.Client(key='AIzaSyCVeQW1Rhy24_GLHqGsLf6KHoUTkGCwAOA')


@googlemapsBlueprint.route('/googlemaps/placename', methods=['GET'])
def get_placename_from_coordinates():
    lat = request.args.get('lat', default=0, type=float)
    lng = request.args.get('lng', default=0, type=float)
    reverse_geocode_result = gmaps.reverse_geocode(
        (lat, lng), language="NO")
    return reverse_geocode_result[0]['formatted_address']
