
import os
import bcrypt
import psycopg2
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv("DATABASE_URL")

def get_hashed_password(plain_text_password):
    # En Python, bcrypt.hashpw retourne des bytes, on décode en utf-8 pour le stockage en DB
    return bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def test_login_logic():
    password = "password123"
    hashed = get_hashed_password(password)
    
    # Simuler la vérification qui se passe dans auth.py
    # credentials.password.encode('utf-8') vs user_data["password_hash"].encode('utf-8')
    is_valid = bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    print(f"Password: {password}")
    print(f"Hashed: {hashed}")
    print(f"Verification success: {is_valid}")

if __name__ == "__main__":
    test_login_logic()
