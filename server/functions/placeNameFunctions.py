import googlemaps


gmaps = googlemaps.Client(key='AIzaSyCVeQW1Rhy24_GLHqGsLf6KHoUTkGCwAOA')


def get_placename_from_coordinates(lat, lng):
    reverse_geocode_result = gmaps.reverse_geocode(
        (lat, lng), language="NO")
    return reverse_geocode_result[0]['formatted_address']
