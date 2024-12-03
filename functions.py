import mysql.connector
from datetime import datetime
from contextlib import contextmanager

def get_db_connection():
    try:
        return mysql.connector.connect(
            host="sql12.freemysqlhosting.net",
            user="sql12748894",
            password="HvR3SPcsl1",
            database="sql12748894",
            autocommit=True
        )
    except mysql.connector.Error as err:
        print(f"Error connecting to database: {err}")
        return None

@contextmanager
def get_cursor():
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        try:
            yield cursor
        finally:
            cursor.close()
            connection.close()
    else:
        yield None

username1 = "hasjdh" #will get from js
password1 = "qweqwe123" #will also get from js

async def checkUser(username, password):
    with get_cursor() as cursor:
        if cursor is None:
            return False
            
        try:
            cursor.execute("SELECT user FROM loginInfo WHERE user = %s", (username,))
            return cursor.fetchone() is not None
        except mysql.connector.Error as err:
            print(f"Error checking user: {err}")
            return False

async def register(username, password): #password and user name entered by the used
    with get_cursor() as cursor:
        if cursor is None:
            return False
            
        try:
            cursor.execute(
                "INSERT INTO loginInfo (user, pass) VALUES (%s, %s)", 
                (username, password)
            )
            return True
        except mysql.connector.Error as err:
            print(f"Error registering user: {err}")
            return False

async def authentication(username, password):
    with get_cursor() as cursor:
        if cursor is None:
            return False
            
        try:
            cursor.execute(
                "SELECT pass FROM loginInfo WHERE user = %s", 
                (username,)
            )
            result = cursor.fetchone()
            return result is not None and result[0] == password
        except mysql.connector.Error as err:
            print(f"Error authenticating user: {err}")
            return False

# Add new functions for expense management
async def add_expense(expense_data: dict):
    """Handle expense addition with a single dictionary parameter"""
    try:
        with get_cursor() as cursor:
            if cursor is None:
                return False

            sql = """INSERT INTO expenses (username, amount, description, date) 
                     VALUES (%s, %s, %s, %s)"""
            values = (
                expense_data["username"],
                expense_data["amount"],
                expense_data["description"],
                datetime.fromisoformat(expense_data["date"].replace('Z', '+00:00'))
            )
            cursor.execute(sql, values)
            return True
    except mysql.connector.Error as err:
        print(f"Error adding expense: {err}")
        return False

async def insert_expense(expense_data: dict):
    """Handle expense addition with a single dictionary parameter"""
    try:
        with get_cursor() as cursor:
            if cursor is None:
                return False

            sql = """INSERT INTO expenses (username, amount, description, date) 
                     VALUES (%s, %s, %s, %s)"""
            values = (
                expense_data["username"],
                expense_data["amount"],
                expense_data["description"],
                datetime.fromisoformat(expense_data["date"].replace('Z', '+00:00'))
            )
            cursor.execute(sql, values)
            return True
    except mysql.connector.Error as err:
        print(f"Error adding expense: {err}")
        return False

async def get_user_expenses(username):
    with get_cursor() as cursor:
        if cursor is None:
            return []
            
        try:
            cursor.execute("""
                SELECT amount, description, date 
                FROM expenses 
                WHERE username = %s 
                ORDER BY date DESC
            """, (username,))
            expenses = cursor.fetchall()
            return [{
                "amount": float(e[0]),
                "description": e[1],
                "date": e[2].isoformat()
            } for e in expenses]
        except mysql.connector.Error as err:
            print(f"Error fetching expenses: {err}")
            return []
