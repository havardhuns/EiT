from flask import Flask
from routes.weather import weatherBlueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/ping')
def sanity_test():
    return 'pong'

app.register_blueprint(weatherBlueprint)
