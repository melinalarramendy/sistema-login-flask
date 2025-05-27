from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId 
from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, user_data):
        self.id = str(user_data["_id"])
        self.username = user_data["username"]
        self.email = user_data["email"]
        self.password_hash = user_data["password_hash"]
        
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def toDBCollection(self):
        return {
            "_id": ObjectId(self.id),
            "username": self.username,
            "email": self.email,
            "password_hash": self.password_hash,
        }