from flask import Flask
from routes.weather import weatherBlueprint
from routes.persistance import persistanceBlueprint
from routes.vegvesen import vegvesenBlueprint
from flask_cors import CORS

app = Flask(__name__, static_folder="build", static_url_path="/")
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/<a>")
def react_routes(a):
    return app.send_static_file("index.html")


@app.route("/")
def react_index():
    return app.send_static_file("index.html")


@app.route('/ping')
def sanity_test():
    return 'pong'


app.register_blueprint(weatherBlueprint, url_prefix='/api')
app.register_blueprint(persistanceBlueprint, url_prefix='/api')
app.register_blueprint(vegvesenBlueprint, url_prefix='/api')
