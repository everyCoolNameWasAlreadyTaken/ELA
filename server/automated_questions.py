from string import Template
import random
import pandas as pd
import json


def create_answer_df():
    """ 

    Create a csv file for automated generated questions with audio and video infos
    .csv file saved as server/data/automated_generated_questions.csv

    """

    videos = pd.read_excel("server/VideoClips/Clip_List.xlsx")
    audios = pd.read_excel("server/AudioClips/0Clip_List.xlsx", skiprows=2)
    df = pd.read_csv("server/data/imdb_top_1000.csv")
    df['Star'] = df[df.columns[10:14]].apply(lambda x: ', '.join(x), axis=1)
    df_tmdb = pd.read_csv("server/data/Hydra-Movie-Scrape.csv")
    audios = audios["Movie Title"].tolist()
    video_names = ["Gravity", "Blade Runner"]
    names = audios + video_names
    movie_names = []
    years = []
    director = []
    genre = []
    cast = []
    length = []
    for name in names:
        if name in df["Series_Title"].values:

            movie_names.append(name)
            years.append(df.loc[df["Series_Title"] == name,
                                "Released_Year"].iloc[0])
            director.append((df.loc[df["Series_Title"] == name,
                                    "Director"].iloc[0]))
            genre.append((df.loc[df["Series_Title"] == name, "Genre"].iloc[0]))
            cast.append((df.loc[df["Series_Title"] == name, "Star"].iloc[0]))
            length.append((df.loc[df["Series_Title"] == name,
                                  "Runtime"].iloc[0].split()[0]))

        else:
            print(name)
            # if name in df_tmdb["original_title"].values:
    data = {
        "movie_names": movie_names,
        "released_year": years,
        "director": director,
        "genre": genre,
        "cast": cast,
        "length": length
    }
    df_answers = pd.DataFrame(data)
    df_answers.to_csv("server/data/automated_generated_questions.csv")


questions = {0: "What is $i?", 1: "Who is the $i?", 2: "Is this film a $i?"}
# 2: "Which of the following films is the $i"
#        2: ["earliest", "latest", "longest", "shortest"],
# 3: "What is another film of the same $i of this clip?"
# 3: ["year", "genre"]
variables = {
    0: ["the movie release year", "the movie name"],
    1: ["actor/actress", "director"],
    2: ["comedy", "thriller", "drama", "romance"],
}


def generate_random_question(questions, variables):

    question_num = len(questions)
    question_idx = random.randint(0, question_num - 1)
    temp_obj = Template(questions[question_idx])
    result = temp_obj.substitute(i=random.choice(variables[question_idx]))
    return result


def generate_all_questions():
    all_questions = []
    for question_idx in questions:
        question_template = Template(questions[question_idx])
        for variable in variables[question_idx]:
            question = question_template.substitute(i=variable)
            all_questions.append(question)

    return all_questions


def generate_qa_for_automated():
    all_questions = generate_all_questions()
    database = pd.read_csv(r"data/automated_questions_video.csv",
                           skipinitialspace=True,
                           quotechar='"')
    auto_qa = dict()
    auto_qa[all_questions[0]] = database["released_year"].tolist()
    auto_qa[all_questions[1]] = database["movie_names"].tolist()
    auto_qa[all_questions[2]] = database["cast"].tolist()
    auto_qa[all_questions[3]] = database["director"].tolist()
    auto_qa[all_questions[4]] = [
        "yes" if "comedy" in g.lower() else "no"
        for g in database["genre"].tolist()
    ]
    auto_qa[all_questions[5]] = [
        "yes" if "thriller" in g.lower() else "no"
        for g in database["genre"].tolist()
    ]
    auto_qa[all_questions[6]] = [
        "yes" if "drama" in g.lower() else "no"
        for g in database["genre"].tolist()
    ]
    auto_qa[all_questions[7]] = [
        "yes" if "romance" in g.lower() else "no"
        for g in database["genre"].tolist()
    ]

    df_autoqa = pd.DataFrame(auto_qa)
    df_autoqa.to_csv("data/video_answers.csv")


def filter_method(random_video_id, question_num, answer_data, database):
    question_data = pd.read_csv(answer_data)
    questions = generate_all_questions()
    movie_id = database["video/audio_name"].tolist()
    data = []

    for idx_q, question in enumerate(questions):
        for idx, id in enumerate(movie_id):
            if id == random_video_id:
                data.append({
                    'question': question,
                    'answer': str(question_data.iloc[idx, idx_q + 1])
                })
    

    return random.sample(data,question_num)


def combime_method(random_video_id, filtered_data, database, format,_type):

    data={
        "clip_address":
        "/assets/"+_type+"Clips/" + random_video_id + format,
        "movie_name":
        database.loc[database["video/audio_name"] == random_video_id,
                     "movie_names"].iloc[0],
        "questions":
        filtered_data
    }
    return data
