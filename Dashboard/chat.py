import google.generativeai as genai
# main.py
from fastapi import FastAPI
from pydantic import BaseModel
import requests  # or any other library to interact with Gemini API


app = FastAPI()
genai.configure(api_key="AIzaSyCimAqa7BwLamEjdVYVLQCQHKJZRoM9p0Y")
model = genai.GenerativeModel("gemini-1.5-flash")


class UserMessage(BaseModel):
    message: str

@app.post("/chat")
async def chat_with_gemini(user_message: UserMessage):
    # Replace with your Gemini chatbot API interaction
    # For example, you may need to make an API call here to the Gemini model
    response = "Hello, how can I help you today?"
    return {"response": response}

