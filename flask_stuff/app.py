from flask import Flask, jsonify
import json
import utils
app = Flask(__name__)

@app.route("/")
def hello():
    print 'oman starting this.'
    utils.auth_and_login()

@app.route('/projects/')
def projects():
    return 'The project page'

@app.route('/about')
def about():
    return 'The about page'

app.debug = True
if __name__ == "__main__":
    app.run()