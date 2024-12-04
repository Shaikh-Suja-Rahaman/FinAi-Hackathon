import google.generativeai as genai



genai.configure(api_key="AIzaSyCimAqa7BwLamEjdVYVLQCQHKJZRoM9p0Y")
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("By the next prompt, you will be recieving some data regarding money spent and the cateogary. you are supposed to return me some advice on spending how to spend more cautiously next time.you dont have to provide any response now. ready?")

print(response.text)