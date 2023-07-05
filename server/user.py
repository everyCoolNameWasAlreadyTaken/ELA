import pymongo
import json

host = 'localhost'
port = 27017
user_data = 'userdata/users.json'

client = pymongo.MongoClient(host, port)
db = client.ela
collection = db.users


def import_data_to_db(filename):
    with open(filename, 'r') as file:
        for jsonObj in file:
            user_dict = json.loads(jsonObj)
            collection.insert_one(user_dict)


def export_data_to_json(filename):
    data = list(collection.find())
    with open(filename, 'w') as f:
        json.dump(data, f)


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
        document = collection.find_one({"_id": user_id})
        item_type = answer_data["itemType"]
        new_data = answer_data["data"]

        if document:
            if "Quizdata" not in document:
                document["Quizdata"] = {}

            if item_type not in document["Quizdata"]:
                document["Quizdata"][item_type] = []

            document["Quizdata"][item_type] = answer_data["data"]
            collection.update_one(
                {"_id": user_id},
                {"$push": {f"Quizdata.{item_type}": new_data}}
            )
        else:
            document = {
                "_id": user_id,
                "Quizdata": {
                    item_type: answer_data["data"]
                }
            }
            collection.insert_one(document)

        return "Answer data stored successfully", 200
    except Exception as e:
        return "Error storing answer data: " + str(e), 500



