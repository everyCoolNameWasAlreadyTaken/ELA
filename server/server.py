from flask import Flask

app = Flask(__name__)

SERVER_PORT = 5000
HOST = '0.0.0.0'


@app.route('/')
def hello():
    return 'Hello from Flask Server :)'


if __name__ == '__main__':
    app.run(host=HOST, port=SERVER_PORT, debug=True)

