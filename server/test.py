import requests
import json
# import weather

with open('evjetrondheim.txt', 'r') as f:
    route = json.load(f)
    for coords in route:
        glatt = requests.get(f"http://localhost:5000/weather/glatt/lat/{coords['lat']}/lng/{coords['lng']}/time/now")
        # weather.isGlatt(coords.lat, coords.lng, 'now')