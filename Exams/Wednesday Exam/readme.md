# COMP 4537 Wed. Midterm Exam
 
## Honour Code

By submitting your work to Github you agree to the following:

+ You did not consult with any other person in completing the examination.
+ You did not aid any other person in the class in completing their examination.
+ If you consulted any external sources, such as resources available on the World Wide Web, in completing the examination then you have cited the source. (You do not need to cite class notes or Sun/Oracle Java documentation.)
+ You are not aware of any infractions of the honour code for this examination.

> Violations of this honour code will be treated as a case of academic misconduct and will dealt with under BCIT policies governing such issues. A consequence of this may be to nullify this exam for everyone that submits work for grading!

# Part I - Delta Proxy API Server [24 Marks]
## Background 
Build a Proxy API server to serve pokémon's data. Your API server will act as an intermediary server between a client and the server that we used in A1 to get the  pokémon's documents:
`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json`. Let us call this server, the *pokedex* server for short. 
Your server will not maintain pokémons documents on its own db as we did in assignment 1. Instead, it will only maintain the **updates/delta changes** on these documents. Several reasons why we might do this; first, may be because we might don't have much space on our server to store all the pokémons documents. Although the pokémons json data is not that much big but what if we had thousands of clients and we want to customize the changes for each client by having a separate pokémons db for each a client. Duplicating the whole pokémons db for each client is an overkill. Proxy servers has many other applications like logging, load-balancing, and authorization. 

Let me elaborate on the logic behind our proxy server using the following examples.  

Request 1 - Suppose a client sends a GET requests for the *Bulbasaur* pokémon to your proxy API server. Your server should fetch this directly from *pokedex*. In this example, your server acted purely as a proxy server.

Request 2 - Suppose a client sends a PATCH request to update the *Bulbasaur* pokémon  to your proxy API server. Your server should store the updates on it is own db. In this example, your server saved only the **changes** and acted as a *delta* proxy server.

Request 3 - Suppose a client sends another GET request for the *Bulbasaur*  pokémon to your proxy API server. Your server should merge the local changes with the document retrieved from *pokedex* and return the merged document to the client. Again, in this example, your server acted as proxy server but also modified the *pokedex* response before sending it to the client.


## Requirements
You need to work out the same requirements of A1. You should support the following routes.
```js
app.get('/api/v1/pokemons?count=2&after=10')     // - get all the pokemons after the 10th. List only Two.
app.post('/api/v1/pokemon')                      // - create a new pokemon
app.get('/api/v1/pokemon/:id')                   // - get a pokemon
app.get('/api/v1/pokemonImage/:id')              // - get a pokemon Image URL
app.put('/api/v1/pokemon/:id')                   // - upsert a whole pokemon document
app.patch('/api/v1/pokemon/:id')                 // - patch a pokemon document or a portion of the pokemon document
app.delete('/api/v1/pokemon/:id')                // - delete a  pokemon 
```
The only difference here, is that you should not retrieve all the pokémons once your server boots up. Instead, you should proxy all your GET requests to *pokedex* and merge the retrieved document with the local stored delta changes, if there is any.


## Development Strategy and Hints
Reimplement A1 route to match the requirements of this API server.
- Create a local empty DB when you boot your server.
  - Store the delta changes in the local DB.
  - Use the same schema you used for A1. Minor tweaks are Ok.
- Use the same tests you used for A1 to test and validate your implementation.
- On booting your server, do not populate the db with pokémons docs from *pokedex* as you did in A1.
- For `app.get('/api/v1/pokemon/:id')` route, get the pokémon for *pokedex* server, merge it with local changes, if any, and send it back the client. Local changes values should overshadow *pokedex* values. Oh, one more thing. Make sure the pokémon is not deleted before sending it back the to the client! 
- `app.get('/api/v1/pokemons?count=2&after=10') ` route should be the same as the previous route but instead, you should return all the pokémons paginated using `count` and `after`. 
<!-- careful with async here -->
- `app.post('/api/v1/pokemon')` and `app.put('/api/v1/pokemon/:id')` will upsert a whole pokémon document. May you could use the same controller/call back function to save time.
- In `app.delete('/api/v1/pokemon/:id')` route, you have to mark the deletion of a pokémon. It is left to you how to design this deletion request. 


# Part II - Autocomplete Server [6 Marks]
Design a route for the following request
```
/api/v1/getPokemonswithRegex?searchQuery=pika_
```
that expects a partial pokémon name in its query parameters and returns full name of a pokémon. Case should be insensitive. 

## Example 1
The following request should match the pokémon *pikachu*. Underscore just means any single character is possible: 

|Possible matches for *pikachu*|
|---|
|`/api/v1/getPokemonswithRegex?searchQuery=pika_`|
|`/api/v1/getPokemonswithRegex?searchQuery=pIkA_`|
|`/api/v1/getPokemonswithRegex?searchQuery=pikach_`|
|`/api/v1/getPokemonswithRegex?searchQuery=pika_h_`|
|`/api/v1/getPokemonswithRegex?searchQuery=_ikach_`|

## Example 2
You should allow some fillers in between the query characters to allow the possible case:

|Possible matches for *pikachu* and *Pichu*|
|---|
|`/api/v1/getPokemonswithRegex?searchQuery=picu`|


## Example 3
Also, `_ika` partial pokémon's name should match the following full pokémons names
```
Pikachu	
Magikarp	
Chikorita	
Zebstrika	
Klinklang	
Vikavolt 
```
## Demo
Test the above test cases using this demo https://visionary-cuchufli-5a9a5f.netlify.app/.

## Hint
Here is a hint on how to use the regex in node.js:
```js
  let poke_regex ; // TODO 
  const possibilities = pokemonArrayFromPokedex.filter(({ name }) => poke_regex.test(name.english))
```

# Deliverables
- Submit a GitHub link of your code on
  - D2L.   
  - Also in this form https://forms.gle/2jTg9FAWeCnzNjZ7A

# Draft Rubric
Total 30 marks
- [24 Marks] Part I - Delta Proxy API Server 
    - 3 marks for each of six routes. Total 18.
    - 6 marks for testing.
 
- [6 Marks] Part II - Autocomplete Server 

**Penalties** - I will penalize you for 
 - improper/missing GIT commits, 
 - server crashes,
 - missing deliverables, and/or 
 - late submission.
