from string import Template
import random
import pandas as pd


def create_answer_df(_type):
    """
    Create a csv file for automated generated questions with audio and video infos
    .csv file saved as server/data/automated_generated_questions.csv
    _type:video/audio
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
    """
    This method generates a random question by substituting placeholders in the question template with random variables from the provided list.

    Parameters:
    - questions (dict): A dictionary containing question templates with placeholders.
    - variables (dict): A dictionary containing lists of variables corresponding to each question template.

    Returns:
    - A randomly generated question as a string
    """
    question_num = len(questions)
    question_idx = random.randint(0, question_num - 1)
    temp_obj = Template(questions[question_idx])
    result = temp_obj.substitute(i=random.choice(variables[question_idx]))
    return result


def generate_all_questions():
    """
    This method generates all possible questions by substituting placeholders in the question templates with all
    variables from the provided lists.

    Returns:
    - A list of all generated questions.
    """
    all_questions = []
    for question_idx in questions:
        question_template = Template(questions[question_idx])
        for variable in variables[question_idx]:
            question = question_template.substitute(i=variable)
            all_questions.append(question)

    return all_questions


def generate_qa_for_automated(file, outfile):
    """
    This method generates question-answer pairs for automated questions based on the provided file data and saves the
    result in a CSV file.

    Parameters:
    - file (str): The path to the input file (e.g., "automated_questions_audio.csv" or "automated_questions_video.csv").
    - outfile (str): The path to the output file (e.g., "audio_answers.csv" or "video_answers.csv").
    """
    all_questions = generate_all_questions()
    database = pd.read_csv(file, skipinitialspace=True, quotechar='"')
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
    df_autoqa.to_csv(outfile)


def filter_method(random_video_id, question_num, answer_data, database):
    """
    This method filters the question-answer data based on the provided random video ID and generates a specified
    number of filtered questions.

    Parameters:
    - random_video_id (str): The randomly selected video ID.
    - question_num (int): The number of filtered questions to generate.
    - answer_data (str): The path to the answer data file (e.g., "audio_answers.csv" or "video_answers.csv").
    - database (DataFrame): The database containing video or audio information.

    Returns:
    - A list of filtered question-answer pairs.
    """
    question_data = pd.read_csv(answer_data,
                                skipinitialspace=True,
                                quotechar='"')
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
    random.shuffle(data)

    return data[:question_num]


def combime_method(random_video_id, filtered_data, database, format, _type):
    """
    This method combines the filtered data with video or audio information to create a dictionary representing the
    complete data for a specific clip.

    Parameters:
    - random_video_id (str): The randomly selected video or audio ID.
    - filtered_data (list): The filtered question-answer pairs.
    - database (DataFrame): The database containing video or audio information.
    - format (str): The file format of the video or audio clip (e.g., ".mp3" or ".mp4").
    - _type (str): The type of the clip, either "Video" or "Audio".

    Returns:
    - A dictionary containing the clip address, movie name, genre, year, and questions.
    """
    data = {
        "clip_address":
            "/assets/" + _type + "Clips/" + random_video_id.strip() + format,
        "movie_name":
            database.loc[database["video/audio_name"] == random_video_id, "movie_names"].iloc[0],
        "genre":
            database.loc[database["video/audio_name"] == random_video_id, "genre"].iloc[0],
        "year":
            database.loc[database["video/audio_name"] == random_video_id, "released_year"].iloc[0],
        "questions":
            filtered_data
    }
    return data
