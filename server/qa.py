import random
import json


def generate_question(data):
    """
    This method generates a random question from a given dataset.

    Parameters:
    - data (str): The path to the JSON file containing the question and answer data.

    Returns:
    - A tuple containing the generated question, a list of answer options, and the correct answer.
    """
    with open(data) as json_file:
        qa = json.load(json_file)
        while True:
            qa_current = random.choice(qa)
            if qa_current['correct_index']:
                return qa_current['question'], qa_current[
                    'answers'], qa_current['answers'][
                        qa_current['correct_index']]
            else:
                continue


def read_questions_from_file(file_path):
    """
    This method reads a JSON file containing question and answer data and returns a list of formatted questions.

    Parameters:
    - file_path (str): The path to the JSON file containing the question and answer data.

    Returns:
    - A list of dictionaries representing the formatted questions. Each dictionary contains the following fields:
            qid (str): The question ID.
            question (str): The question text.
            answers (list): A list of answer options.
            correct_index (int): The index of the correct answer in the answers list.
            name (str): The name associated with the question.
            year (str): The year associated with the question.
            genre (str): The genre associated with the question.
    """
    with open(file_path, 'r') as file:
        data = json.load(file)
        questions = []
        for item in data:
            quid = item['qid']
            question = item['question']
            answers = item['answers']
            correct_index = item['correct_index']
            year = item['year']
            name = item['name']
            genre = item['genre']
            questions.append({
                'qid': quid,
                'question': question,
                'answers': answers,
                'correct_index': correct_index,
                'name': name,
                'year': year,
                'genre': genre
            })
    return questions

