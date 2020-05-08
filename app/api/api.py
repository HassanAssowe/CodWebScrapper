from flask import Flask, render_template, request

# import webbrowser
# import threading

import CodWebScrapper as cod
app = Flask(__name__)


# routing for different pages
@app.route('/')
def load_login():
    return render_template('login_page.html')


@app.route('/login_info', methods=['GET', 'POST'])
def login_info():
    username = request.form['user']
    passw = request.form['pass']
    cod.authenticate(username, passw)
    # return username, passw


if __name__ == '__main__':
    # url = 'http://localhost:5000/'
    # will open up a browser after waiting a certain amount of time
    # threading.Timer(1.25, lambda: webbrowser.open(url)).start()
    app.run(host="localhost", port=5000, debug=False)
