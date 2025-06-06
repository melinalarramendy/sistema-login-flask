from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/"
DATABASE_NAME = "login-flask"

def dbConnect():
    try:
        client = MongoClient(
    'mongodb://localhost:27017/',
    ssl=False, 
    socketTimeoutMS=20000,
    connectTimeoutMS=20000,
    serverSelectionTimeoutMS=5000
)
        print("Conexión exitosa a la base de datos")
        return client[DATABASE_NAME]
    except ConnectionError as e:
        print(f"Error al conectar a la base de datos: {e}")
        raise