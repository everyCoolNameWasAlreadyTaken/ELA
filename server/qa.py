import random
import json


def generate_question(data):
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
    with open(file_path, 'r') as file:
        data = json.load(file)
        questions = []
        for item in data:
            quid = item['qid']
            question = item['question']
            answers = item['answers']
            correct_index = item['correct_index']
            year=item['year']
            name=item['name']
            questions.append({
                'qid': quid,
                'question': question,
                'answers': answers,
                'correct_index': correct_index,
                'name':name,
                'year':year
            })
    return questions


# print(generate_question("server/data/qa.json"))
