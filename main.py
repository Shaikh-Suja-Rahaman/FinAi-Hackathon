from fastapi import FastAPI
from fastapi.params import Body
from pydantic import BaseModel, ValidationError
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from schema import *
from functions import *
from datetime import datetime

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5501" , "*"],  # Allow all origins (use specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/auth')
async def postAuth(info : loginInfo):

    flag = await authentication(info.username , info.password)
    if (flag):
        return {"result" : "true"}
    return {"result" : "false"}

    
@app.post('/register')  #TO add to database
async def uploadUser(info : loginInfo):
    
    flag = await register(info.username , info.password)
    
    if (flag):
        return {"result" : "true"}
    
    return {"result" : "false"}


@app.post('/chkUser') # to check if the user already exists
async def userExists(info : loginInfo):
    flag = await checkUser(info.username , info.password)
    
    if (flag):
        return {"result" : "true"}
    
    return {"result" : "false"}

@app.post('/expenses/add')
async def add_expense(expense: dict):
    try:
        required_fields = ['username', 'amount', 'description', 'date']
        if not all(field in expense for field in required_fields):
            return {"result": "false", "error": "Missing required fields"}
            
        success = await insert_expense(expense)  # Call refactored function
        return {"result": str(success).lower()}
    except Exception as e:
        print(f"Error adding expense: {e}")
        return {"result": "false", "error": "Internal server error"}

@app.get('/expenses/{username}')
async def get_expenses(username: str):
    try:
        expenses = await get_user_expenses(username)
        return {"expenses": expenses}
    except Exception as e:
        print(f"Error getting expenses: {e}")
        return {"expenses": [], "error": "Internal server error"}
