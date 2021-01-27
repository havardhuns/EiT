from flask import Flask
app = Flask(__name__)

@app.route('/ping')
def sanity_test():
    return 'pong'