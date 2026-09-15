import os

class Config:
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
    PORT = int(os.getenv('PORT', 5003))
    HOST = os.getenv('HOST', '0.0.0.0')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///contact.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
