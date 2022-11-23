# Authentication vs Authorization
We have used JWT for authorization. Sometimes this get easily mixed with authentication. 

Here is a nice analogy to get the difference between the two:
>  when you go through security in an airport, you show your ID to authenticate your identity. Then, when you arrive at the gate, you present your boarding pass to the flight attendant, so they can authorize you to board your flight and allow access to the plane.

Authentication is the process of confirming a user's identity, whereas authorization is the process of confirming their level of access. 
Authorization usually done after successful authentication.


In SSR servers, sessions and cookies are the main mechanisms to maintain a user session on the server side. this needed because of the nature of the stateless HTTP protocol. In API server, the common practice is to use JWT tokens  to maintain the user session. Mainly because the client of an API server may not be able to use cookies. Remember cookies can be managed by browsers but by standalone web client app.

- Sessions 
![sessions](https://cdn.discordapp.com/attachments/1016585518840041503/1044496659750592532/unknown.png)
- JWT
![JWT](https://cdn.discordapp.com/attachments/1016585518840041503/1044496691274977300/unknown.png)
- JWT Advantage
![JWT pearls](https://cdn.discordapp.com/attachments/1016585518840041503/1044497820847181935/unknown.png)

## A2 Discussion
- Why we needed a DB in A2?
  Answer: because we needed it for
    - To resend the same token every time to the user
      - bad security practice
    - To determine which user has logged in and manage authorization
      - we might used the payload to determine the user role.
    - Logout flag 
      - better to set expiry times and use refresh tokens
  
## JWT Revisited - Refresh Tokens
Because anyone who has a token can access the resources that the token authorizes, these tokens are intentionally designed to have limited lives (often minutes). An access token's vulnerability increases with the length of its validity. A brief lifespan helps safeguard the assets of your company. However, you must once more gather user credentials whenever an access token expires. Refresh tokens allow you to use shorter lifetimes for access tokens without repeatedly requesting user credentials because they have longer expiration times than access tokens.
![logic](https://i.imgur.com/tGLL4R9.png)
[image source](https://fusebit.io/blog/refresh-tokens-security/?utm_source=www.google.com&utm_medium=referral&utm_campaign=none) 

## Demo


```js
let refreshTokens = [] // replace with db
app.post('/requestNewAccessToken', asyncWrapper(async (req, res) => {
  const { token } = req.body
  if (!token) {
    throw new PokemonAuthError("No Token: Please provide a token.")
  }
  if (!refreshTokens.includes(token)) {
    console.log("token: ", token);
    console.log("refreshTokens", refreshTokens);
    throw new PokemonAuthError("Invalid Token: Please provide a valid token.")
  }
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new PokemonAuthError("Invalid Token: Please provide a valid token.")
    }
    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
    res.header('auth-token-access', accessToken)
    res.send("All good!")
  })
}))

app.post('/login', asyncWrapper(async (req, res) => {
  const { username, password } = req.body
  const user = await userModel.findOne({ username })
  if (!user)
    throw new PokemonAuthError("User not found")

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect)
    throw new PokemonAuthError("Password is incorrect")


  const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
  const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)

  res.header('auth-token-access', accessToken)
  res.header('auth-token-refresh', refreshToken)

  res.send("All good!")
}))
```


Tests

```js

###

# @name login

POST http://localhost:5000/login
Content-Type: application/json

{
  "username": "test",
  "password": "test"
}

###

@NON_ADMIN_ACCESS_TOKEN =  {{login.response.headers.auth-token-access}}

@NON_ADMIN_REFRESH_TOKEN = {{login.response.headers.auth-token-refresh}}

###
GET http://localhost:6000/api/v1/pokemon?id=77&appid={{NON_ADMIN_ACCESS_TOKEN}}


###
# @name requestNewAccessToken

POST http://localhost:5000/requestNewAccessToken
Content-Type: application/json


{
  "token": "{{NON_ADMIN_REFRESH_TOKEN}}"
}

###
@NON_ADMIN_NEW_ACCESS_TOKEN =  {{requestNewAccessToken.response.headers.auth-token-access}}

###
GET http://localhost:6000/api/v1/pokemon?id=77&appid={{NON_ADMIN_NEW_ACCESS_TOKEN}}


### 
GET http://localhost:5000/logout?appid={{NON_ADMIN_TOKEN}}



```

# Express.js Security Middlewares
- [helmet](https://www.npmjs.com/package/helmet)
- [cors](https://www.npmjs.com/package/cors)
- [xss](https://www.npmjs.com/package/xss-clean)
- [express rate limit](https://www.npmjs.com/package/express-rate-limit)

# HTTPS
- Always to secure end-to-end communication