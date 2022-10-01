# Assignment 1 Draft v2 - Pokémon API
Build a Restful API to serve Pokémons data.


You have to provide the following routes
```js
// app.get('/api/v1/pokemons?count=2&after=10')     // - get all the pokemons after the 10th. List only Two.
// app.post('/api/v1/pokemon')                      // - create a new pokemon
// app.get('/api/v1/pokemon/:id')                   // - get a pokemon
// app.get('/api/v1/pokemonImage/:id')              // - get a pokemon Image URL
// app.put('/api/v1/pokemon/:id')                   // - upsert a whole pokemon document
// app.patch('/api/v1/pokemon/:id')                 // - patch a pokemon document or a
                                                    //   portion of the pokemon document
// app.delete('/api/v1/pokemon/:id')                // - delete a  pokemon 
```

# Requirements 
## DB - how to create?
- Your server has to fetch the data from [this GitHub repo](https://github.com/fanzeyi/pokemon.json) dynamically.
  - We will use the [Pokémon file](https://github.com/fanzeyi/pokemon.json/blob/master/pokedex.json) to fetch the Pokeomns docs and create the  Pokémon collection
  - We will use the [types file](https://github.com/fanzeyi/pokemon.json/blob/master/types.json) to fetch the Pokémons types
  - You may use the *https* node.js module to fetch data from other servers.

- Create a database on MongoDB Atlas that has all Pokémons documents.
Here is a sample of a document :

```json
 {
    "_id": "63362087630bb70e3a073cf9",
    "base": {
      "HP": 80,
      "Attack": 82,
      "Defense": 83,
      "Speed": 80,
      "Speed Attack": 100,
      "Speed Defense": 100
    },
    "id": 3,
    "name": {
      "english": "Venusaur",
      "japanese": "フシギバナ",
      "chinese": "妙蛙花",
      "french": "Florizarre"
    },
    "type": [
      "Grass",
      "Poison"
    ],
    "__v": 0
  }
  ```


## Routes
As listed above. Just care for the query parameters: `count` and `after`. Inspired by to the way [old.reddit.com](https://old.reddit.com/) list posts. Use use `async`/`await` as much as possible as it will make your code more readable. Server should never crash, hence wrap the `await`s with try catch blocks. Try to customize the error message sent to the user so the user can resend a proper request. 


## Schema 
- Validate all the Pokémon's attributes using a proper mongoose schema. 
- Pokémon `id` should be unique. Hence, client may not add the same Pokémon twice.
- Pokémon `name` value should be an object.
- Pokémon's English name should be 20 characters max.
- Pokémon `type` value should be dynamically fetched as an `enum` array

## API Docs
- Add a brief documentation page for your API so users can know how to use it. 
```
<Your heroku domain name>/api/doc
```
Document your server routes, schema rules, responses, and any other specs for the users to follow. 

## Responses
- You should always respond in JSON
- Your server should respond with friendly and clear messages if it
  - receives a get, delete, or update request for a Pokémon that does not exist
  - receives an insert request for a Pokémon that has already been inserted
  - receives request for a route that does not exist
  - needs to relay any errors like validation or db errors

# Deliverables
*To be added but for now links to github, heroku, tests (Thunder Client requests) dump, self-graded rubric, and short 2-4 minutes offline YT video demo*

# Tests
Try to test your API server by sending the following
- GET request to retrieve all the Pokémons. `count` and `after` query parameters must be provided.
- GET request to retrieve a single Pokémon. `id` path parameter should be valid. 
- POST request to create a new Pokémon. All the Pokémon properties should be valid and not missing. Pokémon should not be duplicate. 
- DEL request to delete an existing Pokémon. `id` path parameter should be valid.
- PUT request to upsert a Pokémon. `id` path parameter should be valid. 
- PATCH request to patch an existing Pokémon. `id` path parameter should be valid.

For each of the previous request, a *success* response should be returned to a client to indicate a successful insertion to the db.

An HTTP JSON body should be used to send the document in POST, PUT, and PATCH requests.

[My Tests](/thunder-collection_Pokemons.json)

# Rubric
*To be added*

# Shorts Hints
*To be added*

# Due Date
Oct the 9th Midnight.

