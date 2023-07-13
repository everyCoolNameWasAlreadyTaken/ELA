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
    for question in question_data:
        logger.info(question)
        genres = question.get("genre", "").replace(" ", "").split(",")
        logger.info("genres: " + str(genres))
        if not genres:
            continue
        for genre in genres:
            is_correct = question.get("isCorrect", False)
            if genre not in genre_stats:
                genre_stats[genre] = {"total": 0, "correct": 0, "percentage": 0.0}
            genre_stats[genre]["total"] += 1
            if is_correct:
                genre_stats[genre]["correct"] += 1

        logger.info("genre_stats calc end: " + str(genre_stats))
    return genre_stats


def calculate_percentage(genre_stats):
    for genre, stats in genre_stats.items():
        total = stats["total"]
        correct = stats["correct"]
        if total > 0:
            percentage = (correct / total) * 100
            stats["percentage"] = percentage
    return genre_stats


def calculate_genre_stats(user_id, item_type, question_data):
    try:
        user = collection.find_one({"_id": user_id})
        genre_stats = user.get("Quizdata", {}).get(item_type, {}).get("genre_stats", {})
        logger.info("calculate_genre_stats: " + str(genre_stats))

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
    with open(filename, 'r') as file:
        data = json.load(file)
        collection.insert_many(data)


def export_data_to_json(filename):
    data = list(collection.find())
    with open(filename, 'w') as file:
        json.dump(data, file)


def get_user(user_id):
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

        res = calculate_genre_stats(user_id, item_type, answer_data["data"])

        return str(res) + "\nAnswer data stored successfully", 200
    except Exception as e:
        return "Error storing answer data: " + str(e), 500


def create_new_user(user_id, item_type, new_data):
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
    user["Quizdata"][item_type]["data"].append(new_data)
    return user


def get_genre_stats(user_id, item_type):
    try:
        user = collection.find_one({"_id": user_id})
        genre_data = user["Quizdata"][item_type]["genre_stats"]
        return genre_data, 200
    except Exception as e:
        return "Error retrieving genre stats: " + str(e), 500
