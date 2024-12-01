from pydantic import BaseModel, ValidationError


class loginInfo(BaseModel):
    username : str
    password : str
