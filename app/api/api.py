from flask import Flask, render_template, request, jsonify
import CodWebScrapper as cod
import urllib.parse

app = Flask(__name__)


# routing for different endpoints
@app.route('/login', methods=['GET'])
def login():
    username = request.args['email']
    passw = request.args['password']
    status = cod.authenticate(username, passw)
    return jsonify(status)

@app.route('/user', methods=['GET'])
def userInfo():
    username = urllib.parse.unquote(request.args['username'])
    response = cod.getLatestMatch(username, "battle")
    print (username)
    print(response)
    return jsonify(response)


if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=False)
