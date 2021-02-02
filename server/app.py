from flask import Flask
from routes.weather import weather_report
app = Flask(__name__)

@app.route('/ping')
def sanity_test():
    return 'pong'

app.register_blueprint(weather_report)
