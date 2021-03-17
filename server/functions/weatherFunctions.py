from datetime import datetime, timedelta

def getNextHour(datetimeObject):
    return (datetimeObject.replace(microsecond=0, second=0, minute=0) + timedelta(hours=1)).isoformat() + "Z"


#def getWeatherIconIdFrom