from string import Template
import random
from imdby.imdb import imdb
import pandas as pd


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


def longest_movie(names, dataframe):
    """ 
    
    names: a list of movie names in automated_generated_questions.csv
    dataframe: automated_generated_questions.csv 
    returning movie name of the longest length as string

    """
    df = pd.read_csv(dataframe)
    length = dict()
    for name in names:
        length[name] = df.loc[df["movie_names"] == name, "length"].iloc[0]
    return max(length, key=length.get)


def shortest_movie(names, dataframe):
    """ 
    
    names: a list of movie names in automated_generated_questions.csv
    dataframe: automated_generated_questions.csv 
    returning movie name of the shortest length as string

    """
    df = pd.read_csv(dataframe)
    length = dict()
    for name in names:
        length[name] = df.loc[df["movie_names"] == name, "length"].iloc[0]
    return min(length, key=length.get)


def earliest_movie(names, dataframe):
    """ 
    
    names: a list of movie names in automated_generated_questions.csv
    dataframe: automated_generated_questions.csv 
    returning movie that has the earliest release date as string

    """
    df = pd.read_csv(dataframe)
    release = dict()
    for name in names:
        release[name] = df.loc[df["movie_names"] == name,
                               "released_year"].iloc[0]
    return min(release, key=release.get)


def latest_movie(names, dataframe):
    """ 
    
    names: a list of movie names in automated_generated_questions.csv
    dataframe: automated_generated_questions.csv 
    returning movie that has the latest release date as string

    """
    df = pd.read_csv(dataframe)
    release = dict()
    for name in names:
        release[name] = df.loc[df["movie_names"] == name,
                               "released_year"].iloc[0]
    return max(release, key=release.get)


def generate_question():
    questions = {
        0: "What is $i?",
        1: "Who is the $i?",
        2: "Which of the following films is the $i",
        3: "Which of the following film is a $i"
    }
    variables = {
        0: ["the movie release year", "the movie name"],
        1: ["actor/actress", "director"],
        2: ["earliest", "latest", "longest", "shortest"],
        3: ["comedy", "thriller", "drama", "romance"]
    }
    question_num = len(questions)
    question_idx = random.randint(0, question_num - 1)
    temp_obj = Template(questions[question_idx])
    result = temp_obj.substitute(i=random.choice(variables[question_idx]))
    return result


# print(
#     latest_movie(
#         ["Harry Potter and the Sorcerer's Stone", "Jaws", "The Godfather"],
#         "server/data/automated_generated_questions.csv"))
