from flask import Flask, render_template, request
import webbrowser
import threading

app = Flask(__name__)


# routing for different pages
@app.route('/')
def load_login():
    return render_template('login_page.html')


@app.route('/', methods=['POST'])
def my_form_post():
    text = request.form['text']
    return text


if __name__ == '__main__':
    url = 'http://localhost:8000/'
    # will open up a browser after waiting a certain amount of time
    threading.Timer(1.25, lambda: webbrowser.open(url)).start()
    app.run(host="localhost", port=8000, debug=True)
