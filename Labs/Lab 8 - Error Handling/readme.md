# Error Handling
Probably in A1 you have seen your node.js server crashes because of an error. And Hopefully, you have tried to handle these errors. In this lab, I will you should replace all your error handling logic to one place and make use of custom Errors class, and overwrite the default Express Error Handler.

It is not just the user experience that dictates why we should care for error handling. Error handling is a must if we want our program to be secure, resilient, high-performing and bug-free.



# Task 1 - Introduce Custom API Exceptions/Errors
Similar to what we did in the last example in the lecture, introduce new exceptions like `PokemonBadRequest`, `PokemonBadRequestMissingID`, `PokemonDbError` , or `PokemonNotFoundError`. Maintain the hierarchy between related exceptions. For example  `PokemonBadRequestMissingID` should extends `PokemonBadRequest`

# Task 2 - Trigger Exceptions/Errors
- Raise an exception or an error every time you need to signal a bad request to the client
- Raise an exception or an error every time you need to return special value. For example, return null, empty arrays, or empty strings should be avoided.

# Task 3 - Error Handling
- Handle all the raised exceptions plus all anticipated exceptions from db, mongoose, JS parsing, or JS expression evaluating. 
- For all exceptions, send a friendly message to the client and print out the Error name and callback stack into the server console. 
- You should overwrite the default Express error handler.

# Task 4 - Async/await Wrapper
Use the following wrapper inside your routes to clean your code. 

Source - [https://zellwk.com/blog/async-await-express/]


```js
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

```

sample route usage
```js
app.get('/api/v1/pokemons', asyncWrapper(async (req, res) => {
  const docs = await pokeModel.find({})
  res.json(docs)
}))
```

# Deliverables 
Modify your A1 work and handle all the Errors gracefully. 

Submit a GitHub link.

Due in a week.

