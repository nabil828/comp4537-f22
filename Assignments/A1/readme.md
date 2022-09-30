# Assignment 1 Draft - Pokémon API
Build a Restful API to serve Pokémons data.


You have to provide the following routes
```js
// app.get('/api/v1/pokemons?count=2&after=10')     // - get all the pokemons after the 10th. List only Two.
// app.post('/api/v1/pokemon')                      // - create a new pokemon
// app.get('/api/v1/pokemon/:id')                   // - get a pokemon
// app.get('/api/v1/pokemonImage/:id')               // - get a pokemon Image URL
// app.patch('/api/v1/pokemon/:id')                 // - update a pokemon
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
As listed above. Just care for the query parameters: `count` and `after`. Inspired by to the way [old.reddit.com](https://old.reddit.com/) list posts.


## Schema 
- Validate all the Pokémon's attributes using a proper mongoose schema. 
- Pokémon `id` should be unique. Hence, client may not add the same Pokémon twice.
- Pokémon `name` value should be an object
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

# Rubric
*To be added*

# Due Date
Oct the 9th Midnight.

