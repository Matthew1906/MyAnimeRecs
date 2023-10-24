from dotenv import load_dotenv
from pymongo import MongoClient
from os import getenv
import ssl

load_dotenv()

def get_database():
    client = MongoClient(getenv("MONGO_URL"), tlsAllowInvalidCertificates=True)
    return client['myanimerecs']
        