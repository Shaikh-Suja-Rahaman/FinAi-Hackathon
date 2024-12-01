from fastapi import FastAPI
from fastapi.params import Body
from pydantic import BaseModel, ValidationError
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from schema import *
from functions import *

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
    print(info.username)
    
    exists = await checkUser(info.username , info.password)
    
    if(exists):    
    
        flag = await authentication(info.username , info.password)
        if (flag):
            return {"result" : "true"}
        
        return {"result" : "false"}
    else:
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
