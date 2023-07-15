import pymongo
import json
import logging

host = 'localhost'
port = 27017
user_data = 'userdata/users.json'

client = pymongo.MongoClient(host, port)
db = client.ela
collection = db.users

logger = logging.getLogger('werkzeug')


def add_genre_stats(genre_stats, question_data):
    """
    This method adds genre statistics based on the question data to the existing genre stats.

    Parameters:
    - genre_stats (dict): The existing genre statistics.
    - question_data (list): A list of dictionaries containing question data.

    Returns:
    - genre_stats (dict): Updated genre statistics after adding the question data.
    """
    for question in question_data:
        genres = question.get("genre", "").replace(" ", "").split(",")

        if not genres:
            continue
        for genre in genres:
            is_correct = question.get("isCorrect", False)
            if genre not in genre_stats:
                genre_stats[genre] = {"total": 0, "correct": 0, "percentage": 0.0}
            genre_stats[genre]["total"] += 1
            if is_correct:
                genre_stats[genre]["correct"] += 1

    return genre_stats


def calculate_percentage(genre_stats):
    """
    This method calculates the percentage of correct answers for each genre based on the genre statistics.

    Parameters:
    - genre_stats (dict): Genre statistics with total and correct counts.

    Returns:
    - genre_stats (dict): Genre statistics with percentage calculated for each genre.
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
    This method calculates and updates the genre statistics for a specific user and item type.

    Parameters:
    - user_id (str): User ID for whom the genre statistics are being calculated.
    - item_type (str): Item type for which the genre statistics are being calculated.
    - question_data (list): A list of dictionaries containing question data.

    Returns:
    - If successful: Returns a success message as a string indicating that the genre statistics were updated correctly.
    - If error: Returns an error message as a string indicating the error encountered during the calculation.
    """
    try:
        user = collection.find_one({"_id": user_id})
        genre_stats = user.get("Quizdata", {}).get(item_type, {}).get("genre_stats", {})

        genre_stats = add_genre_stats(genre_stats, question_data)
        genre_stats = calculate_percentage(genre_stats)

        collection.update_one(
            {"_id": user_id},
            {"$set": {f"Quizdata.{item_type}.genre_stats": genre_stats}}
        )
        return "Genre Stats updated correctly"
    except Exception as e:
        return "Error calculating statistics: " + str(e)


def import_data_to_db(filename):
    """
    This method imports data from a JSON file and inserts it into the database collection.

    Parameters:
    - filename (str): The name of the JSON file containing the data to be imported.

    Returns: None
    """
    with open(filename, 'r') as file:
        data = json.load(file)
        collection.insert_many(data)


def export_data_to_json(filename):
    """
    This method exports the data from the database collection to a JSON file.

    Parameters:
    - filename (str): The name of the JSON file to which the data will be exported.

    Returns: None
    """
    data = list(collection.find())
    with open(filename, 'w') as file:
        json.dump(data, file)


def get_user(user_id):
    """
    This method retrieves a user's information from the database collection based on the user ID.
    If the user is not found in the collection, it imports the user data from a JSON file and tries to retrieve the
    information again.

    Parameters:
    . user_id (str): User ID for whom the information is being retrieved.

    Returns:
    - If successful: Returns the user's name and HTTP status code 200.
    - If user not found: Returns an error message as a string indicating that the user with the specified ID does not
        have the 'name' attribute and HTTP status code 500.
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
    This method stores the user's answer data in the database collection. It creates a new user if the user does not
    exist and updates the user's information otherwise.

    Parameters:
    - user_id (str): User ID for whom the answer data is being stored.
    - answer_data (dict): The answer data to be stored, including the item type and new data.

    Returns:
    - If successful: Returns a success message as a string indicating that the answer data was stored successfully and
        HTTP status code 200.
    - If error: Returns an error message as a string indicating the error encountered during the storage process and
        HTTP status code 500.
    """
    try:
        item_type = answer_data["itemType"]
        new_data = answer_data["data"]

        user = collection.find_one({"_id": user_id})
        if not user:
            user = create_new_user(user_id, item_type, new_data)
            collection.insert_one(user)
        else:
            user = add_answer_data(user, item_type, new_data)
            collection.update_one({"_id": user_id}, {"$set": user})

        genre_stats = user.get("Quizdata", {}).get(item_type, {}).get("genre_stats", {})
        if not genre_stats:
            genre_stats = {}
            user["Quizdata"][item_type]["genre_stats"] = genre_stats
            collection.update_one(
                {"_id": user_id},
                {"$set": {f"Quizdata.{item_type}.genre_stats": genre_stats}}
            )

        res = calculate_genre_stats(user_id, item_type, new_data["questions"])

        return str(res) + "\nAnswer data stored successfully", 200
    except Exception as e:
        return "Error storing answer data: " + str(e), 500


def create_new_user(user_id, item_type, new_data):
    """
    This method creates a new user document with the specified user ID, item type, and new data.

    Parameters:
    - user_id (str): User ID for the new user document.
    - item_type (str): Item type for the new user document.
    - new_data (dict): New data to be added to the user document.

    Returns:
    - A new user document as a dictionary.
    """
    return {
        "_id": user_id,
        "name": "user",
        "Quizdata": {
            item_type: {
                "data": [new_data],
                "genre_stats": {}
            }
        }
    }


def add_answer_data(user, item_type, new_data):
    """
    This method adds new data to the existing user document based on the item type.

    Parameters:
    - user (dict): The existing user document to which the new data will be added.
    - item_type (str): Item type for which the new data is being added.
    - new_data (dict): New data to be added to the user document.

    Returns:
    - The updated user document as a dictionary.
    """
    user["Quizdata"][item_type]["data"].append(new_data)
    return user


def get_genre_stats(user_id, item_type):
    """
    This method retrieves the genre statistics for a specific user and item type from the database collection.

    Parameters:
    - user_id (str): User ID for whom the genre statistics are being retrieved.
    - item_type (str): Item type for which the genre statistics are being retrieved.

    Returns:
    - If successful: Returns the genre statistics as a dictionary and HTTP status code 200.
    - If error: Returns an error message as a string indicating the error encountered during the retrieval process and
        HTTP status code 500.

    """
    try:
        user = collection.find_one({"_id": user_id})
        genre_data = user["Quizdata"][item_type]["genre_stats"]
        return genre_data, 200
    except Exception as e:
        return "Error retrieving genre stats: " + str(e), 500
