import mysql.connector

mydb = mysql.connector.connect(
  host="sql12.freemysqlhosting.net",
  user="sql12748894",
  password="HvR3SPcsl1",
  database = "sql12748894"
)

mycursor = mydb.cursor()
username1 = "hasjdh" #will get from js
password1 = "qweqwe123" #will also get from js

async def checkUser(username,password):

    mycursor.execute("select user from loginInfo")
    usernames = mycursor.fetchall()
    flag = False
    for name in usernames:
        if(name[0]==username):
            flag = True
            break
    return flag

async def register(username, password): #password and user name entered by the used

    mycursor.execute("INSERT INTO loginInfo (`user`, `pass`) VALUES (%s, %s)", (username, password))
    mydb.commit()

async def authentication(username, password):

    mycursor.execute("select pass from loginInfo where user = %s", (username,))
    out = mycursor.fetchone()
    print(out[0])
    if(out[0]==password):
        return True
    else:
        return False
    






