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


# print(generate_question("server/data/qa.json"))
