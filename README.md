## TECHNOLOGY STACK
<br>
<a href="https://skillicons.dev">
    <img width="200px" src="https://skillicons.dev/icons?i=nodejs,express,react,postgres,js,html,css" />
  </a>

# How to run project



## Zero Step
Open your code editor -> Open Terminal -> Clone this repository to your computer using 
```bash
  git clone https://github.com/cipher1302/Superhero_TestCase.git
```
## First Step
Install the dependencies of both backend and frontend

Frontend
```bash
  cd frontend
  npm i
```
Backend
```bash
  cd backend
  npm i
```


## Second Step

Copy env-example structure for your .env file in your backend folder

```bash
cp .env-example .env
```

After this fill the fields with your database values (⚠️ Note that sequelize in this project designed for postgresql database so you need to use postgresql database for successful connection)

## Third Step

Run your backend and frontend applications

You need **two** terminals: one for backend, one for frontend 

In the first terminal, navigate to the frontend folder.

In the second terminal, navigate to the backend folder.


In your **backend** folder run command
```bash
npm run dev 
```
It runs backend on  http://localhost:3000

In your **frontend** folder run command 
```bash
npm run dev
```
It runs frontend on  http://localhost:5173

Note:  You can test this application via Postman or using frontend server 


# Backend routes for Postman test

**GET ALL**
<br>
http://localhost:3000/api/heroes

**GET ONE HERO**
<br>
http://localhost:3000/api/heroes/hero/:id

**CREATE HERO**
<br>
http://localhost:3000/api/heroes/create

**UPDATE HERO (PATCH)**
<br>
http://localhost:3000/api/heroes/update/:id

**DELETE HERO**
<br>
http://localhost:3000/api/heroes/delete/:id







