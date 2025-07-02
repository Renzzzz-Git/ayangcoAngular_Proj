from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient('mongodb+srv://gdevrenzz055:upTxRez98KlcixbI@dev.nhma76e.mongodb.net/')
db = client['shop']
coll_users = db['users']
coll_products = db['products']

#Viewing all products
@app.route('/api/products/all_products', methods=['GET'])
def all_products():
    all_products = coll_products.find({})
    products = []
    for product in all_products:
        product['_id'] = str(product['_id'])  # Convert ObjectId to string
        products.append(product)
    return jsonify(products), 200

@app.route('/api/users/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    required_fields = ['name', 'username', 'password', 'email', 'address']

    # Check for missing top-level fields
    if not data or any(field not in data for field in required_fields):
        return jsonify({"error": f"Missing required fields: {', '.join(required_fields)}"}), 400

    # Check for required nested address fields
    address_fields = ['street', 'suite', 'city', 'zipcode']
    if any(field not in data['address'] for field in address_fields):
        return jsonify({"error": f"Missing required address fields: {', '.join(address_fields)}"}), 400

    user_data = {
        "name": data['name'],
        "username": data['username'],
        "password": data['password'],
        "email": data['email'],
        "address": {
            "street": data['address']['street'],
            "suite": data['address']['suite'],
            "city": data['address']['city'],
            "zipcode": data['address']['zipcode']
        }
    }

    result = coll_users.insert_one(user_data)

    # Return the inserted user (without password for security reasons)
    return jsonify({
        "id": str(result.inserted_id),
        "name": data['name'],
        "username": data['username'],
        "email": data['email'],
        "address": user_data['address']
    }), 201


@app.route('/api/users/get/<username>', methods=['GET'])
def get_user(username):
    user = coll_users.find_one({"username": username})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404


if __name__ == '__main__':
    app.run(debug=True, port=5000)