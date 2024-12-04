import google.generativeai as genai

genai.configure(api_key="AIzaSyCimAqa7BwLamEjdVYVLQCQHKJZRoM9p0Y")
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Explain how AI works")
print(response.text)