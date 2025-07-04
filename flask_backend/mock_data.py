from pymongo import MongoClient

client = MongoClient('mongodb+srv://gdevrenzz055:upTxRez98KlcixbI@dev.nhma76e.mongodb.net/')
db = client['shop']
collection = db['products']
users = db['users']
carts = db['carts']


#Adding products
'''
collection.insert_many([
    # Electronics
    {
        "name": "Wireless Bluetooth Earbuds",
        "category": "electronics",
        "price": 49.99,
        "stock": 120,
        "description": "True wireless earbuds with noise cancellation and charging case.",
        "image_url": ""
    },
    {
        "name": "Smartphone 5G Model Z",
        "category": "electronics",
        "price": 699.00,
        "stock": 35,
        "description": "Latest 5G smartphone with OLED display and triple camera system.",
        "image_url": ""
    },
    {
        "name": "Gaming Laptop Pro 16",
        "category": "electronics",
        "price": 1500.00,
        "stock": 15,
        "description": "High-performance gaming laptop with RTX graphics and 16GB RAM.",
        "image_url": ""
    },
    {
        "name": "Portable Power Bank 20000mAh",
        "category": "electronics",
        "price": 35.00,
        "stock": 80,
        "description": "Fast-charging power bank with dual USB outputs.",
        "image_url": ""
    },
    {
        "name": "4K Smart LED TV 55-inch",
        "category": "electronics",
        "price": 850.00,
        "stock": 10,
        "description": "Ultra HD Smart TV with built-in Netflix and YouTube apps.",
        "image_url": ""
    },

    # Clothing
    {
        "name": "Men's Casual Sneakers",
        "category": "clothing",
        "price": 65.00,
        "stock": 60,
        "description": "Comfortable lightweight sneakers for everyday wear.",
        "image_url": ""
    },
    {
        "name": "Women's Summer Dress",
        "category": "clothing",
        "price": 45.00,
        "stock": 40,
        "description": "Floral print chiffon dress perfect for summer outings.",
        "image_url": ""
    },
    {
        "name": "Unisex Hoodie Sweatshirt",
        "category": "clothing",
        "price": 50.00,
        "stock": 55,
        "description": "Soft fleece hoodie with kangaroo pocket and adjustable hood.",
        "image_url": ""
    },
    {
        "name": "Men's Denim Jacket",
        "category": "clothing",
        "price": 70.00,
        "stock": 25,
        "description": "Classic blue denim jacket with button closure.",
        "image_url": ""
    },
    {
        "name": "Women's Yoga Leggings",
        "category": "clothing",
        "price": 30.00,
        "stock": 75,
        "description": "High-waist stretchable leggings for gym and yoga sessions.",
        "image_url": ""
    },

    # Home Appliances
    {
        "name": "Air Fryer XL Capacity",
        "category": "appliances",
        "price": 130.00,
        "stock": 20,
        "description": "Oil-free air fryer with digital touch control and timer.",
        "image_url": ""
    },
    {
        "name": "Cordless Vacuum Cleaner",
        "category": "appliances",
        "price": 250.00,
        "stock": 15,
        "description": "Rechargeable vacuum cleaner with multiple cleaning modes.",
        "image_url": ""
    },
    {
        "name": "Rice Cooker 1.8L",
        "category": "appliances",
        "price": 55.00,
        "stock": 50,
        "description": "Non-stick rice cooker with keep-warm function.",
        "image_url": ""
    },
    {
        "name": "Electric Kettle 1.7L",
        "category": "appliances",
        "price": 40.00,
        "stock": 65,
        "description": "Fast-boil electric kettle with auto shut-off feature.",
        "image_url": ""
    },
    {
        "name": "Mini Refrigerator",
        "category": "appliances",
        "price": 320.00,
        "stock": 8,
        "description": "Compact refrigerator ideal for dorms and small rooms.",
        "image_url": ""
    },

    # Health & Beauty
    {
        "name": "Vitamin C Serum",
        "category": "health_beauty",
        "price": 25.00,
        "stock": 100,
        "description": "Brightening face serum with hyaluronic acid and Vitamin C.",
        "image_url": ""
    },
    {
        "name": "Hair Dryer 2000W",
        "category": "health_beauty",
        "price": 35.00,
        "stock": 45,
        "description": "Powerful salon-style hair dryer with cool shot button.",
        "image_url": ""
    },
    {
        "name": "Electric Toothbrush Set",
        "category": "health_beauty",
        "price": 60.00,
        "stock": 30,
        "description": "Rechargeable electric toothbrush with 3 brushing modes.",
        "image_url": ""
    },
    {
        "name": "Organic Aloe Vera Gel",
        "category": "health_beauty",
        "price": 15.00,
        "stock": 70,
        "description": "Multi-purpose moisturizing gel for skin and hair.",
        "image_url": ""
    },
    {
        "name": "Makeup Brush Set",
        "category": "health_beauty",
        "price": 20.00,
        "stock": 60,
        "description": "10-piece soft synthetic makeup brush set for blending and contouring.",
        "image_url": ""
    },

    # Toys & Games
    {
        "name": "Building Block Set 1000pcs",
        "category": "toys",
        "price": 55.00,
        "stock": 40,
        "description": "Large creative building block set for kids aged 6 and up.",
        "image_url": ""
    },
    {
        "name": "Remote Control Drone",
        "category": "toys",
        "price": 150.00,
        "stock": 18,
        "description": "Beginner-friendly drone with HD camera and one-key return.",
        "image_url": ""
    },
    {
        "name": "Board Game: Family Edition",
        "category": "toys",
        "price": 30.00,
        "stock": 50,
        "description": "Fun and engaging board game for 2-6 players.",
        "image_url": ""
    },
    {
        "name": "RC Monster Truck",
        "category": "toys",
        "price": 80.00,
        "stock": 20,
        "description": "All-terrain radio control truck with shock absorbers.",
        "image_url": ""
    },
    {
        "name": "Plush Teddy Bear",
        "category": "toys",
        "price": 25.00,
        "stock": 60,
        "description": "Extra soft and large-sized teddy bear for kids and adults.",
        "image_url": ""
    },

    # Sports & Outdoors
    {
        "name": "Yoga Mat Non-Slip",
        "category": "sports_outdoors",
        "price": 35.00,
        "stock": 55,
        "description": "Eco-friendly non-slip yoga mat with carrying strap.",
        "image_url": ""
    },
    {
        "name": "Adjustable Dumbbell Set",
        "category": "sports_outdoors",
        "price": 120.00,
        "stock": 25,
        "description": "Adjustable weight dumbbell set for home gym use.",
        "image_url": ""
    },
    {
        "name": "Camping Tent 4-Person",
        "category": "sports_outdoors",
        "price": 180.00,
        "stock": 12,
        "description": "Waterproof and easy-setup camping tent for outdoor adventures.",
        "image_url": ""
    },
    {
        "name": "Mountain Bike Helmet",
        "category": "sports_outdoors",
        "price": 45.00,
        "stock": 30,
        "description": "Impact-resistant and lightweight helmet for biking.",
        "image_url": ""
    },
    {
        "name": "Portable Water Bottle 1L",
        "category": "sports_outdoors",
        "price": 20.00,
        "stock": 80,
        "description": "Leak-proof BPA-free water bottle for outdoor and gym use.",
        "image_url": ""
    }
])


#Adding users
users.insert_many([
    {
        "name": "John Doe",
        "username": "john_doe",
        "password": "password123",
        "email": "john.doe@example.com",
        "address": {
            "street": "Maple Street",
            "suite": "Apt. 101",
            "city": "New York",
            "zipcode": "10001"
        }
    },
    {
        "name": "Jane Smith",
        "username": "jane_smith",
        "password": "securepass456",
        "email": "jane.smith@example.com",
        "address": {
            "street": "Oak Avenue",
            "suite": "Suite 202",
            "city": "Los Angeles",
            "zipcode": "90001"
        }
    },
    {
        "name": "Michael Lee",
        "username": "michael_lee",
        "password": "mikepass789",
        "email": "michael.lee@example.com",
        "address": {
            "street": "Pine Road",
            "suite": "Unit 303",
            "city": "Chicago",
            "zipcode": "60601"
        }
    },
    {
        "name": "Emily Wong",
        "username": "emily_wong",
        "password": "emilypass321",
        "email": "emily.wong@example.com",
        "address": {
            "street": "Cedar Boulevard",
            "suite": "Floor 4",
            "city": "Houston",
            "zipcode": "77001"
        }
    },
    {
        "name": "David Kim",
        "username": "david_kim",
        "password": "davidpass654",
        "email": "david.kim@example.com",
        "address": {
            "street": "Elm Lane",
            "suite": "Room 505",
            "city": "Phoenix",
            "zipcode": "85001"
        }
    }
])
'''

from random import choice
from bson import ObjectId
from datetime import datetime

# Get all users and products
all_users = list(users.find({}))
all_products = list(collection.find({}))

# Insert 1 cart per user with 1 random product each
cart_documents = []

for user in all_users:
    product = choice(all_products)
    
    cart_item = {
        "productId": product["_id"],
        "name": product["name"],
        "category": product["category"],
        "price": product["price"],
        "stock": product["stock"],
        "description": product["description"],
        "image_url": product["image_url"],
        "checkState": True
    }

    cart = {
        "username": user["username"],
        "items": [cart_item],
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }

    cart_documents.append(cart)

# Insert carts into the "carts" collection
carts.insert_many(cart_documents)

