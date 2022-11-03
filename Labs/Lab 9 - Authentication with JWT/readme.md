# Authentication Server
Implement an authentication server for A1.

- [Authentication Server](#authentication-server)
  * [The `dotenv` package](#the--dotenv--package)
  * [`pokeUser` Collection](#-pokeuser--collection)
- [The `/register` Route](#the---register--route)
- [Hashing the Password](#hashing-the-password)
- [The `/login` Route](#the---login--route)
- [Maintaining the Authentication State using JWT](#maintaining-the-authentication-state-using-jwt)
  * [The `auth()` middleware](#the--auth----middleware)
- [Challenge 1](#challenge-1)
- [Challenge 2](#challenge-2)
- [Challenge 3](#challenge-3)
- [Challenge 4](#challenge-4)

## The `dotenv` package
Use the `dotenv` to store your secrets. 

To generate a random secret you may try the following to generate 64 random bytes:
```js
require("crypto").randomBytes(64).toString("hex")
```

Import this package:
```js
const dotenv = require("dotenv")
dotenv.config();
```

And store your environment variables in an `.env` file:

```
DB_STRING = "mongodb://localhost:27017/test"
PORT = 5000
```

Make sure that  you don't commit and push this file to GitHub.

You may access these variables as such:

```js
 const x = await mongoose.connect(process.env.DB_STRING)
```
And 

```js
   app.listen(process.env.PORT, (err) => {
```

If you want to deploy your site to Heroku, you can use the dashboard to set these environment variables:
![https://cdn.hashnode.com/res/hashnode/image/upload/v1635169865362/fPod5-TXC.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1635169865362/fPod5-TXC.png)

## `pokeUser` Collection
you may store user info and a `pokeUser` collection

```js
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 3,
    max: 20
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
    max: 1000,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 3
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('pokeUser', schema) //pokeUser is the name of the collection in the db

```

# The `/register` Route
Implement a POST route to handle the following request:

```
POST http://localhost:5000/register
Content-Type: application/json

{
  "username": "test",
  "password": "test",
  "email": "test@test.ca"
}
```
and respoonse:

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 135
ETag: W/"87-FI8+5DifMMVPYzFHQ88QFRAPUAw"
Date: Thu, 03 Nov 2022 04:13:19 GMT
Connection: close

{
  "username": "test",
  "password": "test",
  "email": "test@test.ca",
  "_id": "63633fdf2a061650ce5c28cb",
  "date": "2022-11-03T04:13:19.727Z",
  "__v": 0
}
```

Code: 

```js
app.post('/register', asyncWrapper(async (req, res) => {
  const { username, password } = req.body
  const user = await userModel.create({ username, password })
  res.send(user)
}))

```

<!-- ### Challenge -->

# Hashing the Password
Use the `bcrypt` package to hash the password. 
Why? - https://blog.moertel.com/posts/2006-12-15-never-store-passwords-in-a-database.html
How does it work? - https://dev.to/sylviapap/bcrypt-explained-4k5c .

```js
const bcrypt = require("bcrypt")
app.post('/register', asyncWrapper(async (req, res) => {
  const { username, password, email } = req.body
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const userWithHashedPassword = { ...req.body, password: hashedPassword }

  const user = await userModel.create(userWithHashedPassword)
  res.send(user)
}))
```

Response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 191
ETag: W/"bf-YVipdedlKdEivGc2XGcmM6+2dY8"
Date: Thu, 03 Nov 2022 04:30:06 GMT
Connection: close

{
  "username": "test",
  "password": "$2b$10$eNtJlJJ5mJinM625l.0m0OZMm7TJUi7Dj/6y/f7dHrtkmjghURut.",
  "email": "test@test.ca",
  "_id": "636343ce0523a56febe87bd8",
  "date": "2022-11-03T04:30:06.271Z",
  "__v": 0
}

```
# The `/login` Route
Code: 
```js
app.post('/login', asyncWrapper(async (req, res) => {
  const { username, password } = req.body
  const user = await userModel.findOne({ username })
  if (!user) {
    throw new PokemonBadRequest("User not found")
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new PokemonBadRequest("Password is incorrect")
  }
  res.send(user)
}))

```

Request : 
```
POST http://localhost:5000/login
Content-Type: application/json

{
  "username": "test",
  "password": "test"
}
```

Response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 191
ETag: W/"bf-WbsJR0ywFbKqE/LYVxvhUrRCyJA"
Date: Thu, 03 Nov 2022 04:35:08 GMT
Connection: close

{
  "_id": "636344ea3b452f42953f67f7",
  "username": "test",
  "password": "$2b$10$wtf.GfFqeLL0X3bIaoTgSOBWenXFwZQhClO0r6aHve58d7PAgEkHm",
  "email": "test@test.ca",
  "date": "2022-11-03T04:34:50.890Z",
  "__v": 0
}

```

# Maintaining the Authentication State using JWT
Install *jsonwebtoken* package and use it to *sign* and *verify* your JWTs.

```js
const jwt = require("jsonwebtoken")
app.post('/login', asyncWrapper(async (req, res) => {
  const { username, password } = req.body
  const user = await userModel.findOne({ username })
  if (!user) {
    throw new PokemonBadRequest("User not found")
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new PokemonBadRequest("Password is incorrect")
  }

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token)

  res.send(user)
}))

```

Response:

```
HTTP/1.1 200 OK
X-Powered-By: Express
auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzYzNDc1NzEzOTZhNzA3YmMzZTMzZGUiLCJpYXQiOjE2Njc0NTA3MTV9.s4S_GurXEdh-CRxiWOkFjDkc6_kBWinxfhyk74x4QW0
Content-Type: application/json; charset=utf-8
Content-Length: 191
ETag: W/"bf-p3d/pPdWbooU6kxbE40ID8COeEg"
Date: Thu, 03 Nov 2022 04:45:15 GMT
Connection: close

{
  "_id": "636347571396a707bc3e33de",
  "username": "test",
  "password": "$2b$10$y6KfQEVGqfY8JM1PXksqmegFRhuJYjWHHsfkRiV1FEYKuNAOO/B1y",
  "email": "test@test.ca",
  "date": "2022-11-03T04:45:11.355Z",
  "__v": 0
}
```

## The `auth()` middleware 
to protect all the Pokemon's API route

```js
const auth = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    throw new PokemonBadRequest("Access denied")
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET) // nothing happens if token is valid
    next()
  } catch (err) {
    throw new PokemonBadRequest("Invalid token")
  }
}

app.use(auth) // Boom! All routes below this line are protected

app.get('/api/v1/pokemons', asyncWrapper(async (req, res) => {}))

app.get('/api/v1/pokemon/:id', asyncWrapper(async (req, res) => {}))

app.post('/api/v1/pokemon/', asyncWrapper(async (req, res) => {}))

app.delete('/api/v1/pokemon/:id', asyncWrapper(async (req, res) => {}))

app.put('/api/v1/pokemon/:id', asyncWrapper(async (req, res) => {}))

app.patch('/api/v1/pokemon/:id', asyncWrapper(async (req, res) => {}))

app.get("*", (req, res) => {})

app.use(handleErr)

```

Now, try to register, login, and access a protected route!

```
POST http://localhost:5000/register
Content-Type: application/json

{
  "username": "test",
  "password": "test",
  "email": "test@test.ca"
}

###

POST http://localhost:5000/login
Content-Type: application/json

{
  "username": "test",
  "password": "test"
}

###

GET http://localhost:5000/api/v1/pokemon/77
auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzYzNGExYmI2YTEwODQ5NThmZTg3ZjUiLCJpYXQiOjE2Njc0NTE0MjB9.HgsL3XaZw_DbckwZGvdXRCb3MDcp6TpuiwkdJf_HrMo


```

Phew! 


# Challenge 1
Try to make the server set and get the token using cookies.

# Challenge 2
Can you make the necessary changes to make your API authenticate and authorize users the same way https://openweathermap.org/api does? 

Remember that *openweathermap* API generates an `API KEY` per user and ask the user to use this key for each request:
```
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```

Hint: generate a JWT token per user. Store it in a db. Verify tokens for each request.

# Challenge 3
Can you split the functionally of this lab intro two servers?
  - (http://localhost:5000) Authentication server: proxy server for register and login.
  - (http://localhost:6000) API server: server data



As long as the two servers share the same secret token, the same JWT token could be used for verification on both servers.

Tests
```
POST http://localhost:5000/register
Content-Type: application/json

{
  "username": "test",
  "password": "test",
  "email": "test@test.ca"
}

###

POST http://localhost:5000/login
Content-Type: application/json

{
  "username": "test",
  "password": "test"
}

###

GET http://localhost:6000/api/v1/pokemon/77
auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY0MTNiZjc3NTM1MWM5ODJjN2JmNTciLCJpYXQiOjE2Njc1MDMwNTR9.Roe2sx28XA88BH501loULxvL_hvQ2i3dKeu6Rnr5H8k

###
```

# Challenge 4  
How to implement a `/logout` route? 
Hints
 - For SSR servers, If you are using sessions, check `express-session` doc to set an expiration date for a session variable.
- For API servers that uses JWT: 
  - If you are using cookies, set an age in *ms*:
```js
res.cookie('jwtToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
```
  or clear the cookie:
 ```js
 res.clearCookie("cookieToken")
 ```
  - You may also use an expiration date for a JWT token. Check the `expiresIn` option for `jwt.sign()` method in the package doc. - https://www.npmjs.com/package/jsonwebtoken .  