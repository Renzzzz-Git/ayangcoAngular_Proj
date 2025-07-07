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
coll_orders = db['orders']

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



def convert_objectid(obj):
    if isinstance(obj, dict):
        return {k: convert_objectid(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid(i) for i in obj]
    elif isinstance(obj, ObjectId):
        return str(obj)
    else:
        return obj


@app.route('/api/carts/get/<username>', methods=['GET'])
def get_cart(username):
    cart = coll_carts.find_one({"username": username})
    if cart:
        cart = convert_objectid(cart)
        return jsonify(cart), 200
    return jsonify({"error": "Cart not found"}), 404


@app.route('/api/carts/append_item/<username>', methods=['PATCH'])
def append_item_to_cart(username):
    new_item = request.get_json()

    if not new_item or '_id' not in new_item:
        return jsonify({"error": "Invalid item or missing _id"}), 400

    try:
        item_id = new_item['_id']  
    except:
        return jsonify({"error": "Invalid _id format"}), 400

    # Check if item with the same _id already exists in the cart
    existing_cart = coll_carts.find_one({
        "username": username,
        "items._id": item_id
    })

    if existing_cart:
        return jsonify({"error": "Item already exists in cart"}), 409

    # Convert _id string to ObjectId before inserting (optional)
    new_item['_id'] = item_id

    # Append item to the cart
    result = coll_carts.update_one(
        {"username": username},
        {"$push": {"items": new_item}, "$set": {"updatedAt": datetime.utcnow()}}
    )

    if result.modified_count == 0:
        return jsonify({"error": "Cart not found or item not appended"}), 404

    return jsonify({"message": "Item added to cart successfully"}), 200




@app.route('/api/carts/remove_item/<username>', methods=['PATCH'])
def remove_item_from_cart(username):
    data = request.get_json()

    if not data or '_id' not in data:
        return jsonify({"error": "_id is required"}), 400

    try:
        product_id = data['_id'] 
    except:
        return jsonify({"error": "Invalid _id"}), 400

    result = coll_carts.update_one(
        {"username": username},
        {
            "$pull": {"items": {"_id": product_id}},  # match ObjectId
            "$set": {"updatedAt": datetime.utcnow()}
        }
    )

    if result.modified_count == 0:
        return jsonify({"error": "Cart not found or item not removed"}), 404

    return jsonify({"message": "Item removed from cart successfully"}), 200



@app.route('/api/orders/add_order/<username>', methods=['POST'])
def add_order(username):
    # Check if user exists
    user = coll_users.find_one({"username": username})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Get order data from request body
    order_data = request.get_json()
    items = order_data.get("items", [])
    payment_method = order_data.get("paymentMethod")

    # Validate and process items
    processed_items = []
    total_price = 0  # initialize total

    for item in items:
        quantity = item.get("quantity", 1)
        price = item.get("price", 0)
        subtotal = quantity * price
        total_price += subtotal

        processed_items.append({
            "_id": item["_id"],  # Leave _id as string
            "name": item["name"],
            "category": item["category"],
            "price": price,
            "description": item.get("description", ""),
            "image_url": item.get("image_url", ""),
            "quantity": quantity
        })

    # Extract user address from DB
    address = user.get("address", {
        "zipcode": "",
        "city": "",
        "street": "",
        "suite": ""
    })

    # Build and insert order
    new_order = {
        "username": username,
        "items": processed_items,
        "address": address,
        "paymentMethod": payment_method,
        "totalPrice": round(total_price, 2),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
        "status": "pending"
    }

    result = coll_orders.insert_one(new_order)

    return jsonify({
        "message": "Order created successfully",
        "orderId": str(result.inserted_id),
        "username": username,
        "items": new_order["items"],
        "paymentMethod": new_order["paymentMethod"],
        "address": new_order["address"],
        "totalPrice": new_order["totalPrice"]
    }), 201


@app.route('/api/orders/all_orders/<username>', methods=['GET'])
def all_orders(username):
    user_orders = coll_orders.find({"username": username})
    orders = []

    for order in user_orders:
        order['_id'] = str(order['_id'])  # Convert ObjectId to string
        order['createdAt'] = order['createdAt'].isoformat() if 'createdAt' in order else None
        order['updatedAt'] = order['updatedAt'].isoformat() if 'updatedAt' in order else None
        orders.append(order)

    return jsonify(orders), 200


@app.route('/api/orders/delete_order/<order_id>', methods=['DELETE'])
def delete_order(order_id):
    try:
        result = coll_orders.delete_one({'_id': ObjectId(order_id)})
        
        if result.deleted_count == 1:
            return jsonify({"message": "Order deleted successfully."}), 200
        else:
            return jsonify({"error": "Order not found."}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 400







if __name__ == '__main__':
    app.run(debug=True, port=5000)