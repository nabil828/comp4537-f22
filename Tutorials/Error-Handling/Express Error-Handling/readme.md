# TOC
- [TOC](#toc)
- [Express.js Error Handling](#expressjs-error-handling)
  * [Express Default Error Handler](#express-default-error-handler)
    + [Catch The Exception Explicitly:](#catch-the-exception-explicitly-)
    + [OR Pass The Exception Express Default Error Handler:](#or-pass-the-exception-express-default-error-handler-)
- [Check your understanding](#check-your-understanding)
- [Writing error handlers](#writing-error-handlers)
  * [Define error-handling middleware last](#define-error-handling-middleware-last)
  * [You may define several error-handling middleware functions](#you-may-define-several-error-handling-middleware-functions)


# Express.js Error Handling

If you try to visit the following route 

```
http://localhost:5000/
```
of the following server


```js
const express = require('express');
const app = express();


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

app.get('/', (req, res) => {
  let x = z + 2;
  res.send('Hello World');
});

app.get('/anotherRoute', (req, res) => {
  res.send('anotherRoute');
});
```
the server will spit out `ReferenceError: z is not defined`, return it to the client, but it will not crash!

You may test this out by visiting the other route:

```
http://localhost:5000/anotherRoute
```

The reason why the server is not crashing, is because of the Express Default and built-in handler.

## Express Default Error Handler
The default error handler is a middleware provided by Express to catch all the triggered errors with **almost** no extra work from you. I say almost the default error handler needs you to signal asynchronous errors using `next` function.

Synchronous Code Example:
```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

Asynchronous Code Examples:

<details>
<summary>
Example 1
</summary>
```js
app.get('/', (req, res) => {
  setTimeout(() => {
    throw new Error('BROKEN')     // This will crash the server
                                  // Express will not catch this on its own.
                                  // Client won't be able to send subsequent requests!
  }, 1000);
  res.send('Hello World');
});
```

</details>


<details>
<summary>
Example 2
</summary>

```js

app.get('/', async (req, res) => {
  await new Promise(resolve => {
    throw new Error('Broken')
    setTimeout(resolve, 1000)
  });
  res.send('Hello World');
});
```

</details>


<details>
<summary>
Example 3
</summary>

```js
app.get('/', async (req, res) => {
  let aPromise = new Promise(resolve => {
    throw new Error('Broken')
    setTimeout(resolve, 1000)
  });

  aPromise.then(() => {
    res.send('Hello World');
  })
});
```

</details>


These codes will also crash the server. Here, the client will not even get a response!


In order, to prevent this crash, you have to 

### Catch The Exception Explicitly:
<details>
<summary>
Example 1
</summary>

```js
app.get('/', (req, res) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN')     // This will crash the server
      // Express will not catch this on its own.
      // Client won't be able to send subsequent requests!
      res.send('Hello World');
    } catch (error) {
      res.send('Error');
    }
  }, 1000);
});
```
</details>


<details>
<summary>
Example 2
</summary>

```js
app.get('/', async (req, res) => {
  try {
    await new Promise(resolve => {
      throw new Error('Broken')
      setTimeout(resolve, 1000)
    });
    res.send('Hello World');
  } catch {
    res.send('Error');
  }
});
```
</details>


<details>
<summary>
Example 3
</summary>


```js
app.get('/', async (req, res) => {
  let aPromise = new Promise(resolve => {
    throw new Error('Broken')
    setTimeout(resolve, 1000)
  });

  aPromise.then(() => {
    res.send('Hello World');
  }).catch((err) =>
    res.send('Error'))
});

```
</details>



### OR Pass The Exception Express Default Error Handler:
You could the third argument of any middleware function, `next`, to pass an Error from middleware to another. The Express default Error handler, is the last middleware in the middlewares chain. Remember that we have used `next` before to control the execution of this chain. The only difference here, is that we are passing the Error as an input so some error handler eventually catches this error. 



<details>
<summary>
Example 1
</summary>

```js
app.get('/', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN')     // This will crash the server
      // Express will not catch this on its own.
      // Client won't be able to send subsequent requests!
      res.send('Hello World');
    } catch (error) {
      next(error)
    }
  }, 1000);
});
```
</details>


<details>
<summary>
Example 2
</summary>

```js
app.get('/', async (req, res, next) => {
  let aPromise = new Promise(resolve => {
    throw new Error('Broken')
    setTimeout(resolve, 1000)
  });

  aPromise.then(() => {
    res.send('Hello World');
  }).catch((err) =>
    // res.send('Error')
    next(err)
  )
});
```
</details>


<details>
<summary>
Example 3
</summary>

```js
app.get('/', async (req, res, next) => {
  try {
    await new Promise(resolve => {
      throw new Error('Broken')
      setTimeout(resolve, 1000)
    });
    res.send('Hello World');
  } catch (err) {
    // res.send('Error');
    next(err);
  }
});

```
</details>

you may also try `catch(next)` directly to pass the Error object to Express default handler.


# Check your understanding
What is the output of the following code

```js
app.get('/', async (req, res, next) => {
  try {
    await new Promise(resolve => {
      throw new Error('Broken')
      setTimeout(resolve, 1000)
    });
    res.send('Hello World');
  } catch (err) {
    next(err);
    res.send("I don't care about the error. I still want to send this response");
  }
});
```
Remember the difference between `next()` and `return next()`


# Writing error handlers
Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: `(err, req, res, next)`. 

For example:
```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```
## Define error-handling middleware last
after other app.use() and routes calls. 

For example:
```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use((err, req, res, next) => {
  // logic
})
```

## You may define several error-handling middleware functions
, much as you would with regular middleware functions. For example, to define an error-handler for requests made by using XHR and those without:

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

```


