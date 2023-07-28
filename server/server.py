from flask import Flask, request, jsonify
import openai
from user import *
from automated_questions import *
from qa import *
from flask_cors import CORS
import logging
import requests
import random
from bs4 import BeautifulSoup
import json
import wikipediaapi
import spacy


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


def extract_table_from_wikipedia(url, column_indices):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    table = soup.find('table', {'class': 'wikitable'})

    data = []
    rows = table.find_all('tr')
    for row in rows[1:]:
        cells = [cell.get_text(strip=True) for cell in row.find_all('td')]
        selected_cells = [cells[idx] for idx in column_indices]
        data.append(selected_cells)

    return data

def get_first_paragraph_from_wikipedia_article(wikipedia_article_title):
    wiki_wiki = wikipediaapi.Wikipedia(user_agent="Mozilla/5.0")
    page = wiki_wiki.page(wikipedia_article_title)
    if page.exists():
        return page.summary.split('\n', 1)[0]  # Den ersten Absatz aus der Zusammenfassung extrahieren

    return "Kein erster Absatz gefunden."



def extract_and_replace_important_information(text, num_replacements=3):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    entities = [ent.text for ent in doc.ents if ent.label_ in ["PERSON", "ORG"]]
    num_replacements = min(num_replacements, len(entities))
    replace_entities = random.sample(entities, num_replacements)
    replaced_words = {}

    for entity_text in replace_entities:
        replaced_words[entity_text] = "_" * len(entity_text)
        text = text.replace(entity_text, replaced_words[entity_text])

    return text.strip(), replaced_words

@app.route('/wikiarticle')
def get_table():
    wikipedia_url = "https://de.wikipedia.org/wiki/Liste_der_erfolgreichsten_Filme_nach_Einspielergebnis"
    column_indices_to_extract = [2]

    table_data = extract_table_from_wikipedia(wikipedia_url, column_indices_to_extract)
    random_entry = random.choice(table_data)
    movie_title = random_entry[0]

    wikipedia_search_url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch={movie_title} movie film"
    response = requests.get(wikipedia_search_url)
    data = response.json()

    wikipedia_article_title = None
    wikipedia_article_link = None

    if 'query' in data and 'search' in data['query']:
        search_results = data['query']['search']
        if search_results:
            first_result = search_results[0]
            wikipedia_article_title = first_result['title']
            wikipedia_article_link = f"https://en.wikipedia.org/wiki/{wikipedia_article_title.replace(' ', '_')}"

    if wikipedia_article_title:
        first_paragraph = get_first_paragraph_from_wikipedia_article(wikipedia_article_title)
        processed_text, replaced_words = extract_and_replace_important_information(first_paragraph, 12)

        while processed_text is None or all(replaced_word == "_" for replaced_word in replaced_words.values()):
            # Kein passendes Wort gefunden oder alle ersetzen Wörter mit _ sind Null
            # Einen neuen Wikipedia-Artikel holen und die Funktion erneut aufrufen
            response = requests.get(wikipedia_search_url)
            data = response.json()

            wikipedia_article_title = None
            wikipedia_article_link = None

            if 'query' in data and 'search' in data['query']:
                search_results = data['query']['search']
                if search_results:
                    first_result = search_results[0]
                    wikipedia_article_title = first_result['title']
                    wikipedia_article_link = f"https://en.wikipedia.org/wiki/{wikipedia_article_title.replace(' ', '_')}"

            if wikipedia_article_title:
                first_paragraph = get_first_paragraph_from_wikipedia_article(wikipedia_article_title)
                processed_text, replaced_words = extract_and_replace_important_information(first_paragraph, 12)
            else:
                break

        if processed_text:
            response_data = {
                "movie_title": movie_title,
                "wikipedia_article_link": wikipedia_article_link,
                "first_paragraph": first_paragraph,
                "paragraph_with_blanks": processed_text,
                "replaced_words": replaced_words
            }
            return jsonify(response_data)

    return jsonify({"message": "Kein passender Wikipedia-Artikel gefunden."}), 404




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


@app.route('/users/<int:user_id>/stats/<string:item_type>/<string:selected_option>', methods=['GET'])
def get_user_mc_stats(user_id, item_type, selected_option):
    """
    This method retrieves the genre statistics for a specific item type for a specific user.

    Parameters:
    - user_id (int): User ID for whom the genre statistics are being retrieved.
    - item_type (string): Type of stats data to retrieve (e.g., "multipleChoice", "audioQuiz", "videoQuiz").

    Returns:
    - If successful: Returns a JSON response containing the genre statistics for the user and the specified item type.
    - If error: Returns a JSON response with an error message indicating the error encountered during the retrieval process.
    """
    item_type_cap = item_type[0].upper() + item_type[1:]
    if selected_option == 'genre':
        res, code = get_genre_stats(user_id, item_type_cap)
    elif selected_option == 'movie':
        res, code = calculate_top_movies_percentage(user_id, item_type_cap)
    else:
        return jsonify({'error': 'Invalid selected option.'}), 400
    return jsonify(res), code


@app.route('/users/<int:user_id>/stats/time')
def get_user_progress_data(user_id):
    res, code = get_percentage_per_item_type_and_date(user_id)
    return jsonify(res), code


@app.route('/users/<int:user_id>/stats/percentage')
def get_quiz_percentages(user_id):
    res, code = calculate_quiz_percentages(user_id)
    return jsonify(res), code


@app.route('/users/<int:user_id>/stats/itemTypes/<string:selected_option>')
def get_item_type_stats(user_id, selected_option):
    if selected_option == 'numbers':
        res, code = calculate_item_type_stats(user_id)
    if selected_option == 'percentages':
        res, code = calculate_item_type_stats_percentage(user_id)
    return jsonify(res), code


@app.route('/users/<int:user_id>/stats/level')
def get_level_stats(user_id):
    res, code = get_total_questions_and_answers(user_id)
    return jsonify(res), code


if __name__ == '__main__':
    app.run(host=HOST, port=SERVER_PORT, debug=True)


