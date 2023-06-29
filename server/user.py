from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient("localhost", 27017)

db = client.ela

users = db.users


def get_user(user_id):
    user = users.find_one({'_id': user_id})
    if user is None:
        res = f"ID {user_id} does not exist in this database"
    else:
        name = user.get('name')
        if name:
            res = name
        else:
            f"User with ID {user_id} has no attribute 'name'"


