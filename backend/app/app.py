from flask import Flask, json, jsonify, redirect, request, url_for
from werkzeug.exceptions import BadRequest, NotFound
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, decode_token
from bson import ObjectId, json_util
from flask_cors import CORS
import os
from dotenv import load_dotenv
from models import User
from auth.routes import auth
import database as db

load_dotenv()
db = db.dbConnect()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'super-secret-key')
app.register_blueprint(auth, url_prefix='/auth')

CORS(app)

jwt_manager = JWTManager(app)

@app.route('/dashboard')
@jwt_required()
def dashboard():
    current_user_id = get_jwt_identity()
    
    user_data = db['users'].find_one({"_id": ObjectId(current_user_id)})
    if not user_data:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    return jsonify({
        "success": True,
        "message": "Bienvenido al dashboard",
        "user": {
            "id": str(user_data["_id"]),
            "username": user_data["username"],
            "email": user_data["email"]
        }
    }), 200

@app.route('/users', methods=['GET'])
def get_users():
    try:
        '''current_user_id = get_jwt_identity()'''
        users = db['users']


        users_list = list(users.find(
            {}, 
            {'password_hash': 0} 
        ))

        for user in users_list:
            user['_id'] = str(user['_id'])

        response = {
            'success': True,
            'users': json.loads(json_util.dumps(users_list)),

        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
    


@app.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    collection = db['users']
    try:
        if not ObjectId.is_valid(user_id):
            raise BadRequest("ID de usuario no válido")
        
        user = db['users'].find_one(
            {"_id": ObjectId(user_id)},
            {"password_hash": 0} 
        )

        if not user:
            raise NotFound("Usuario no encontrado")
        
        user['_id'] = str(user['_id'])

        
        response = {
            'success': True,
            'user': json.loads(json_util.dumps(user)),
            'links': {
                'self': f"/users/{user_id}",
            }
        }

        return jsonify(response), 200
    except BadRequest as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'code': 400
        }), 400
        
    except NotFound as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'code': 404
        }), 404
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': "Error interno del servidor",
            'details': str(e),
            'code': 500
        }), 500

        
@app.route('/user', methods=['POST'])
def create_user():
    try:
        if not request.is_json:
            raise BadRequest("El request debe ser JSON (Content-Type: application/json)")
        
        data = request.get_json()
        
        required_fields = ['username', 'email', 'password']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            raise BadRequest(f"Faltan campos obligatorios: {', '.join(missing_fields)}")

        if db['users'].find_one({'$or': [
            {'username': data['username']},
            {'email': data['email']}
        ]}):
            raise BadRequest("El nombre de usuario o email ya existe")

        user_data = {
            "_id": ObjectId(),
            'username': data['username'],
            'email': data['email'],
            'password_hash': generate_password_hash(data['password'])
        }
        
        result = db['users'].insert_one(user_data)
        
        return jsonify({
            'success': True,
            'message': 'Usuario creado exitosamente',
            'user_id': str(result.inserted_id),
            'username': data['username']
        }), 201
        
    except BadRequest as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Error interno del servidor',
            'details': str(e)
        }), 500

@app.route('/user/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        if not request.is_json:
            raise BadRequest("El request debe ser JSON (Content-Type: application/json)")

        if not ObjectId.is_valid(user_id):
            raise BadRequest("ID de usuario no válido")

        data = request.get_json()
        
        allowed_fields = ['username', 'email', 'password_hash', 'favorites', 'shopping_lists']
        update_data = {k: v for k, v in data.items() if k in allowed_fields}

        if not update_data:
            raise BadRequest("No se proporcionaron campos válidos para actualizar")

        result = db['users'].update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_data}
        )

        if result.matched_count == 0:
            raise NotFound("Usuario no encontrado")

        return jsonify({
            'success': True,
            'message': 'Usuario actualizado exitosamente',
            'modified_count': result.modified_count
        }), 200
    except BadRequest as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'code': 400
        }), 400
    except NotFound as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'code': 404
        }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': "Error interno del servidor",
            'details': str(e),
            'code': 500
        }), 500

@app.route('/user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        if not ObjectId.is_valid(user_id):
            raise BadRequest("ID de usuario no válido")

        result = db['users'].delete_one({'_id': ObjectId(user_id)})

        if result.deleted_count == 0:
            raise NotFound("Usuario no encontrado")

        return jsonify({
            'success': True,
            'message': 'Usuario eliminado exitosamente',
            'deleted_count': result.deleted_count
        }), 200
    except BadRequest as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'code': 400
        }), 400
    except NotFound as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'code': 404
        }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': "Error interno del servidor",
            'details': str(e),
            'code': 500
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)