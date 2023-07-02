from flask import Flask, render_template, request, jsonify
import openai
import csv
import pandas as pd
from qa import *
from automated_questions import *
from qa import *
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


@app.route("/audio", methods=['GET'])
def qa():
    database = pd.read_csv(r"data/automated_generated_questions_edited.csv",
                           skipinitialspace=True,
                           quotechar='"')
    movies = database["movie_names"].tolist()
    movie_ids = database["video/audio_name"].tolist()
    video_clips = {}
    for i in range(len(movies)):
        video_clips[movie_ids[i]] = movies[i]
    random_video_id = random.choice(list(video_clips.keys()))
    #retrieve 5 questions for each movie
    filtered_movie = filter_method(random_video_id, 5)
    combined_data = combime_method(random_video_id, filtered_movie)
    return jsonify(combined_data)


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


if __name__ == '__main__':
    app.run(host=HOST, port=SERVER_PORT, debug=True)
