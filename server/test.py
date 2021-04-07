import requests
import json

with open('evjetrondheim.txt', 'r') as f:
    route = json.load(f)
    for coords in route:
        requests.get(f"http://localhost:5000/weather/glatt/lat/{coords['lat']}/lng/{coords['lng']}/time/now")