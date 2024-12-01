from fastapi import FastAPI
from fastapi.params import Body
from pydantic import BaseModel, ValidationError
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from schema import *

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (use specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/auth')
async def postAuth(info : loginInfo):
    
    if (info.username == "admin" and info.password == "123"):
        return {"result" : "true"}
    
    return {"result" : "false"}
    
