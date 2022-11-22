# Assignment 2 - JWT Authentication Server
Implement an authentication server for for the Pokémon API that you have worked on in this course. You may use my solutions for A1 or labs 6 and 9. This assignment is an extension to lab 9.
Basically, you have to implement lab 9's challenges 2, 3, and 4 altogether.

- All the following routes should be implemented:
```
// app.post('/register')      // - register a new user 
// app.post('/login')         // - verify user's credentials 
// app.post('/logout')         // - logout a user / Terminate the logged session.
```



- All the following routes should be protected:
```
app.get('/api/v1/pokemons?count=2&after=10')     // - get all the pokemons after the 10th. List only Two.
app.get('/api/v1/pokemon/:id')                   // - get a pokemon
```
Hence, a user should login before being able to access these routes. 

- To maintain a logging session, you have to pass the token as a query parameter. Although this is not the best practice, we want to mimic how `openweathermap.org` uses *appid* query parameter to maintain the session of a logged user. This was Challenge 2 in lab 9.

- Fulfill the requirements of challenge 3 from lab 9 by separating the functionally of authentication routes from the rest of the other Pokémon routes.


# Additional Role - Admin
The following routes should be only accessible only to *admins*; *Admins* are users with a special role that allows them to access the following routes.
```
app.post('/api/v1/pokemon')                      // - create a new pokemon
app.get('/api/v1/pokemonImage/:id')              // - get a pokemon Image URL
app.put('/api/v1/pokemon/:id')                   // - upsert a whole pokemon document
app.patch('/api/v1/pokemon/:id')                 // - patch a pokemon document or a
                                                    //   portion of the pokemon document
app.delete('/api/v1/pokemon/:id')                // - delete a  pokemon 
```
<!-- 
# Additional Route - `/stats`
- `/stats` Route 
```
app.get('/stats')     // - get statistics related to API usage 
```
This route should only be accessible to *admins*.

The `stats` route should log *events* in your API server. An *event* could be an arrival of a request, a response to a client, or an exception raised. Log the time of each event.

Suggestion structure/schema of the *events* DB:
```json
[
  {
    "event_id": 1,
    "type": "request",
    "time": "2022-09-06T04: 45: 42.914",
    "username": "user1",
    "token_used": "token1",
    "event_data": {
      "route": "api/v1/pokemon/77",
      "http_request_type": "POST",
      "ip_address": "61.48.220.123",
      "query": "",
      "http_body": {}
    }
  },
  {
    "event_id": 2,
    "type": "response",
    "time": "2022-09-06T04: 45: 42.914",
    "username": "user1",
    "token_used": "token1",
    "event_data": {
      "route": "api/v1/pokemon/77",
      "http_request_type": "POST",
      "ip_address": "61.48.220.123",
      "query": "",
      "http_body": {
        "Error": "InvalidArgumentException",
        "Message": "Missing field location"
      }
    }
  }
]
``` -->

# Testing / Error Handling
- Proper access scenarios: 
  - A user register, log in, and access protected routes successfully.
  - Same user log in and fail to access admin-protected routes. 
  - *Admin* user should be able to access all routes including admin-protected routes. 
  - After logout, a user cannot access a protected route.
  - After re-login, the user should receive the same token from the first login and be able to access protected routes.
- Improper access scenarios: The following scenarios should be handled as *exceptions* and user should not access protected routes.
  - While trying to log in, a user 
    - was not registered
    - provided the wrong password 
  - While trying to access a protected route,  
    - no Token was found in the URI.
    - user is logged in successfully but improper token was provided in the URI. 
    - non-admin *user* was trying to access *admin*  protected routes.

# Development Hints
- After users login successfully, they will receive a token which the will be using for every and each subsequent request. This token should **not** change every time the user login. Hence, a user will use the same token for across multiple sessions. To achieve this, you might want to store the token a persistent store like a DB.

- On user logout, the current JWT token should be invalidated or removed from the DB.

- You may choose to handle all the errors under one JS error class and just change the error message. Or relate the separate error classes by inheriting from the same parent error class. 


# Deliverables
- YT short 
  - Two minutes max.
  - Demonstrate the above tests.
- Links for
  - Code on GitHub
  - Tests Dump on GitHub
    - Thunder Client/POSTMAN/REST Client text dump.

# Rubric
Same as the previous tests. 
I will penalize you for 
- Improper/missing incremental atomic GIT commits, 
- Server crashes,
- Missing deliverables, and/or 
- Late submission.
