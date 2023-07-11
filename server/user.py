import pymongo
import json

host = 'localhost'
port = 27017
user_data = 'userdata/users.json'

client = pymongo.MongoClient(host, port)
db = client.ela
collection = db.users


def add_genre_stats(genre_stats, question_data):
    for question in question_data:
        genres = question.get("genre", "").replace(" ", "").split(",")
        for genre in genres:
            is_correct = question.get("isCorrect", False)
            if genre_stats is None:
                genre_stats[genre] = {"total": 0, "correct": 0, "percentage": 0.0}
            genre_stats[genre]["total"] += 1
            if is_correct:
                genre_stats[genre]["correct"] += 1

    return genre_stats


def calculate_percentage(genre_stats):
    """
    Calculate the percentage of correct answers for each genre in the genre_stats.

    Parameters:
    - genre_stats (defaultdict): The genre statistics to calculate percentages.

    Returns:
    - genre_stats (defaultdict): The genre statistics with percentage values.
    """
    for genre, stats in genre_stats.items():
        total = stats["total"]
        correct = stats["correct"]
        if total > 0:
            percentage = (correct / total) * 100
            stats["percentage"] = percentage
    return genre_stats


def calculate_genre_stats(user_id, item_type, question_data):
    """
    Calculate genre statistics for the given user and item type.

    Parameters:
    - user_id (int): The ID of the user.
    - item_type (str): The type of item to calculate genre statistics for.

    Returns:
    - genre_stats (dict): The genre statistics for the user and item type.
    """
    try:
        user = collection.find_one({"_id": user_id})
        genre_stats = user.get("Quizdata", {}).get(item_type, {}).get("genre_stats", {})

        genre_stats = add_genre_stats(genre_stats, question_data)
        genre_stats = calculate_percentage(genre_stats)

        for genre, stats in genre_stats.items():
            collection.update_one(
                {"_id": user_id},
                {"$set": {f"Quizdata.{item_type}.genre_stats.{genre}": stats}}
            )
        return "Genre Stats updated correctly"
    except Exception as e:
        return "Error calculating statistics: " + str(e)


def import_data_to_db(filename):
    """
    Import user data from a JSON file and store it in the database.

    Parameters:
    - filename (str): The path to the JSON file containing user data.
    """
    with open(filename, 'r') as file:
        for jsonObj in file:
            user_dict = json.loads(jsonObj)
            collection.insert_one(user_dict)


def export_data_to_json(filename):
    """
    Export all user data from the database to a JSON file.

    Parameters:
    - filename (str): The path to the JSON file to export the data.
    """
    data = list(collection.find())
    with open(filename, 'w') as f:
        json.dump(data, f)


def get_user(user_id):
    """
    Get the name of the user with the given ID.

    Parameters:
    - user_id (int): The ID of the user.

    Returns:
    - name (str): The name of the user.
    - status_code (int): The HTTP status code (200 for success, 500 for error).
    """
    user = collection.find_one({'_id': user_id})
    if user is None:
        import_data_to_db(user_data)

    user = collection.find_one({'_id': user_id})
    name = user.get('name')
    if name:
        return name, 200
    else:
        return f"User with ID {user_id} has no attribute 'name'", 500


def store_user_answers(user_id, answer_data):
    """
    Store the user's answer data for a specific item type.

    Parameters:
    - user_id (int): The ID of the user.
    - answer_data (dict): The answer data to store, including item type and data.

    Returns:
    - message (str): The success or error message.
    - status_code (int): The HTTP status code (200 for success, 500 for error).
    """
    try:
        user = collection.find_one({"_id": user_id})
        item_type = answer_data["itemType"]
        new_data = answer_data["data"]

        if user:
            if "Quizdata" not in user:
                user = add_empty_quizdata(user)

            if item_type not in user["Quizdata"]:
                user = add_empty_item_data(user, item_type)

            user["Quizdata"][item_type]["data"] = answer_data["data"]
            collection.update_one(
                {"_id": user_id},
                {"$push": {f"Quizdata.{item_type}.data": new_data}}
            )
            res = calculate_genre_stats(user_id, item_type)
        else:
            user = {
                "_id": user_id,
                "Quizdata": {
                    item_type: answer_data["data"]
                }
            }
            collection.insert_one(user)

        return res + "\nAnswer data stored successfully", 200
    except Exception as e:
        return "Error storing answer data: " + str(e), 500


def add_empty_quizdata(user):
    if "Quizdata" not in user:
        user["Quizdata"] = {}
    return user


def add_empty_item_data(user, item_type):
    if item_type not in user["Quizdata"]:
        user["Quizdata"][item_type] = {
            "data": [],
            "genre_stats": {}
        }
    return user


def create_new_user(user_id, item_type, new_data):
    user = {
        "_id": user_id,
        "name": "user",
        "Quizdata": {
            item_type: {
                "data": [new_data],
                "genre_stats": {}
            }
        }
    }
    return user


def add_answer_data(user, item_type, new_data):
    user["Quizdata"][item_type]["data"].append(new_data)
    return user


def get_genre_stats(user_id, item_type):
    try:
        user = collection.find_one({"_id": user_id})

        genre_data = user["Quizdata"][item_type]["genre_stats"]

        return genre_data, 200
    except Exception as e:
        return "Error storing answer data: " + str(e), 500
