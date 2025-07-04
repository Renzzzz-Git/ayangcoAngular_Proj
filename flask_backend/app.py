from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient('mongodb+srv://gdevrenzz055:upTxRez98KlcixbI@dev.nhma76e.mongodb.net/')
db = client['shop']
coll_users = db['users']
coll_products = db['products']
coll_carts = db['carts']

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



@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Query user from database
    user = coll_users.find_one({'username': username})
    
    if not user or user['password'] != password:
        return jsonify({'error': 'Invalid credentials'}), 401

    return jsonify({'user': {'username': user['username'], 'email': user['email']}}), 200


@app.route('/api/products/get/<product_id>', methods=['GET'])
def get_product_by_id(product_id):
    try:
        # Validate and convert product_id to ObjectId
        product = coll_products.find_one({"_id": ObjectId(product_id)})
    except (InvalidId, TypeError):
        return jsonify({"error": "Invalid product ID"}), 400

    if product:
        product['_id'] = str(product['_id'])  # Convert ObjectId to string
        return jsonify(product), 200

    return jsonify({"error": "Product not found"}), 404


@app.route('/api/carts/add_cart', methods=['POST'])
def add_cart():
    data = request.get_json()

    # Check for required field
    if not data or 'username' not in data:
        return jsonify({"error": "Missing required field: username"}), 400

    # Check if user exists by username
    user = coll_users.find_one({"username": data['username']})
    if not user:
        return jsonify({"error": "User not found"}), 404

    cart_data = {
        "username": user['username'],
        "items": [],
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }

    result = coll_carts.insert_one(cart_data)

    return jsonify({
        "message": "Cart initialized successfully",
        "cartId": str(result.inserted_id),
        "username": user['username'],
        "items": []
    }), 201



if __name__ == '__main__':
    app.run(debug=True, port=5000)