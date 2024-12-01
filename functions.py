import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="12345",
database = "main"
)
username1 = "username" #will get from js
password1 = "password" #will also get from js

def register(username, password): #password and user name entered by the used
    mycursor = mydb.cursor()
    mycursor.execute("select user from loginInfo")
    usernames = mycursor.fetchall()
    flag = False
    for name in usernames:
        if(name[0] == username):
            flag = True
            break
    if(flag == True):
        print("Username Already Exists")
    else:
        mycursor.execute("INSERT INTO logininfo (username, password) VALUES (%s, %s)", (username, password))


register(username1, password1)

 # cursor object creation

# mycursor.execute("select * from logininfo")
# out = mycursor.fetchall();
# print(out)
# print(mydb)



