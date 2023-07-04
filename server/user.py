from pymongo import MongoClient, InsertOne
import json
import mongomock
from bson import ObjectId

client = mongomock.MongoClient()
db = client.ela
collection = db.users
requesting = []

with open('userdata/users.json') as file:
    for jsonObj in file:
        userDict = json.loads(jsonObj)
        requesting.append(InsertOne(userDict))

result = collection.bulk_write(requesting)


def get_user(user_id):
    user = collection.find_one({'_id': user_id})
    if user is None:
        res = f"ID {user_id} does not exist in this database"
    else:
        name = user.get('name')
        if name:
            res = name
        else:
            res = f"User with ID {user_id} has no attribute 'name'"
    return res



