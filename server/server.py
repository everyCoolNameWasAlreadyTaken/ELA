from flask import Flask, request, jsonify
import openai
from user import *
from automated_questions import *
from qa import *
from flask_cors import CORS
import logging

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])
logger = logging.getLogger('werkzeug')

SERVER_PORT = 5000
HOST = '0.0.0.0'
openai.api_key = ""
query = "Write a poem for ducks"

movie_name = "The Shawshank Redemption"


@app.route('/')
def hello():
    """
    This method is the root route of the Flask server and returns a greeting message.

    Returns:
    - A string message: "Hello from Flask Server :)"
    """
    return 'Hello from Flask Server :)'


@app.route("/quiz", methods=['GET'])
def quiz_qa():
    """
    This method generates quiz questions and answers from a set of available questions.

    Returns:
    - If successful: Returns a JSON response containing a list of randomly selected quiz questions and answers.
    - If insufficient questions available: Returns a JSON response with an error message indicating that there are not
        enough questions available.
    """
    questions = read_questions_from_file("data/qa_merged.json")
    if len(questions) < 5:
        return jsonify({'error': 'Insufficient questions available.'})

    selected_questions = random.sample(questions, 5)
    data = []
    for question in selected_questions:
        qid = question['qid']
        question_text = question['question']
        answers = question['answers']
        correct_index = question['correct_index']
        year = question['year']
        name = question['name']
        genre = question['genre']

        data.append({
            'qid': qid,
            'question': question_text,
            'answers': answers,
            'correctIndex': correct_index,
            'title': name,
            'year': year,
            'genre': genre
        })

    return jsonify(data)


@app.route("/audio", methods=['GET'])
def audio_qa():
    """
    This method generates audio-related questions and answers.

    Returns:
    - If successful: Returns a JSON response containing audio-related question and answer data.
    """
    database = pd.read_csv(r"data/automated_questions_audio.csv",
                           skipinitialspace=True,
                           quotechar='"')
    audios = database["movie_names"].tolist()
    audio_ids = database["video/audio_name"].tolist()
    audio_clips = {}
    for i in range(len(audios)):
        audio_clips[audio_ids[i]] = audios[i]
    random_audio_id = random.choice(list(audio_clips.keys()))
    filtered_audio = filter_method(random_audio_id, 5,
                                   "data/audio_answers.csv", database)
    combined_data = combime_method(random_audio_id, filtered_audio, database,
                                   ".mp3", "Audio")
    return jsonify(combined_data)


@app.route("/video", methods=['GET'])
def video_qa():
    """
    This method generates video-related questions and answers.

    Returns:
    - If successful: Returns a JSON response containing video-related question and answer data.
    """
    database = pd.read_csv(r"data/automated_questions_video.csv",
                           skipinitialspace=True,
                           quotechar='"')

    movies = database["movie_names"].tolist()
    movie_ids = database["video/audio_name"].tolist()
    audio_clips = {}
    for i in range(len(movies)):
        audio_clips[movie_ids[i]] = movies[i]
    random_audio_id = random.choice(list(audio_clips.keys()))

    filtered_movie = filter_method(random_audio_id, 5,
                                   "data/video_answers.csv", database)
    combined_data = combime_method(random_audio_id, filtered_movie, database,
                                   ".mp4", "Video")
    return jsonify(combined_data)


@app.route('/chat', methods=['GET', 'POST'])
def chat():
    """
    This method integrates ChatGPT and generates a response based on the provided query.

    Returns:
    - The generated response from ChatGPT as a string.
    """
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                            messages=[{
                                                "role": "user",
                                                "content": query
                                            }])
    return response.choices[0].message.content


@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_name(user_id):
    """
    This method retrieves the user's name based on the user ID.

    Parameters:
    - user_id (int): User ID for whom the name is being retrieved.

    Returns:
    - If successful: Returns a JSON response containing the user's name.
    - If user not found: Returns a JSON response with an error message indicating that the user with the specified ID
        does not exist.

    """
    user, code = get_user(int(user_id))

    if user:
        return jsonify({'user_name': user}), code
    else:
        return jsonify({'error': user}), code


@app.route('/users/<int:user_id>/quiz/answers', methods=['POST'])
def handle_user_answers(user_id):
    """
    This method handles the user's answers and stores them in the database.

    Parameters:
    - user_id (int): User ID for whom the answer data is being stored.

    Returns:
    - If successful: Returns a JSON response with a success message indicating that the answer data was
        stored successfully.
    - If error: Returns a JSON response with an error message indicating the error encountered during the
        storage process.
    """
    res, code = store_user_answers(user_id, request.json)
    return jsonify(res), code


@app.route('/users/<int:user_id>/multipleChoice/stats', methods=['GET'])
def get_user_mc_stats(user_id):
    """
    This method retrieves the genre statistics for the Multiple Choice item type for a specific user.

    Parameters:
    - user_id (int): User ID for whom the genre statistics are being retrieved.

    Returns:
    - If successful: Returns a JSON response containing the genre statistics for the user and the Multiple Choice
        item type.
    - If error: Returns a JSON response with an error message indicating the error encountered during the
        retrieval process.
    """
    res, code = get_genre_stats(user_id, "MultipleChoice")
    return jsonify(res), code


if __name__ == '__main__':
    app.run(host=HOST, port=SERVER_PORT, debug=True)

