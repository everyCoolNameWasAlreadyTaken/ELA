from flask import Flask, request, jsonify
import openai
from qa import *
from user import *
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])

SERVER_PORT = 5000
HOST = '0.0.0.0'
openai.api_key = ""
query = "Write a poem for ducks"

movie_name = "The Shawshank Redemption"


@app.route('/')
def hello():
    return 'Hello from Flask Server :)'


#Generate movie released year by its name
#Write a movie name you want to know for variable movie_name
@app.route("/quiz", methods=['GET'])
def ask():
    questions = read_questions_from_file("data/qa.json")
    if len(questions) < 5:
        return jsonify({'error': 'Insufficient questions available.'})

    selected_questions = random.sample(questions, 5)
    data = []
    for question in selected_questions:
        qid = question['qid']
        question_text = question['question']
        answers = question['answers']
        correct_index = question['correct_index']

        data.append({
            'qid': qid,
            'question': question_text,
            'answers': answers,
            'correctIndex': correct_index,
        })

    return jsonify(data)


#Integrate ChatGPT
#1.Provide open AI API key for variable openai.api_key
#2.Write a query for variable query
@app.route('/chat', methods=['GET', 'POST'])
def chat():
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                            messages=[{
                                                "role": "user",
                                                "content": query
                                            }])
    return response.choices[0].message.content


@app.route('/api', methods=['GET'])
def api_get():
    return {
        'userId': 1,
        'title': 'Flask React Application',
        'completed': False
    }


@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_name(user_id):
    user = get_user(user_id)

    if user:
        return jsonify({'user_name': user['user_name']})
    else:
        return jsonify({'error': 'User not found'})


@app.route('/users/<int:user_id>/answers', methods=['POST'])
def stor_mc_user_answer(user_id):
    answer_data = request.get_json()
    print(answer_data)
    answer_client = {}
    for answer in answer_data:
        qid = answer['qid']
        is_correct = answer['isCorrect']
        time_taken = answer['timeTaken']
        db = (store_mc_answer_data(user_id_in=user_id, qid=qid, is_correct=is_correct, time_taken=time_taken))
        answer_client["question_data"] = answer_data
        answer_client["db_response"] = db

    return jsonify(answer_client)


if __name__ == '__main__':
    app.run(host=HOST, port=SERVER_PORT, debug=True)
