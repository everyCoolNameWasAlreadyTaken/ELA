from flask import Flask, jsonify, request

app = Flask(__name__)

SERVER_PORT = 5000
HOST = '0.0.0.0'


@app.route('/')
def hello():
    return 'Hello from Flask Server :)'


@app.route('/api', methods=['GET'])
def api_get():
    return {
        'userId': 1,
        'title': 'Flask React Application',
        'completed': False
    }


if __name__ == '__main__':
    app.run(host=HOST, port=SERVER_PORT, debug=True)

