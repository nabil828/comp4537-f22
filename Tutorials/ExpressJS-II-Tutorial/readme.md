# ExpressJS Middleware
A Middleware is a function that executes somewhat during the request-response cycle.

```js
req => middleware => res
```


> Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:


# Logger Middleware
Suppose we want to log the time every time we execute any route in our server. For that we have to do something like:

```js
const express = require('express')
const app = express()
app.listen(5000)
app.get('/', (req, res)=>{
  console.log('Time:', Date.now())
  res.send("home")
})
app.get('/anotherRoute', (req, res)=>{
  console.log('Time:', Date.now())
  res.send("anotherRoute")
})

```
Now since we might have many other routes, you can see that we started to repeat our self here. 

using a middleware, we can do something like

```js
function timeLogger (req, res, next){
  console.log('Time:', Date.now())
  next()
}

const express = require('express')
const app = express()
app.listen(5000)
app.get('/', timeLogger, (req, res)=>{
  // console.log('Time:', Date.now())
  res.send("home")
})
app.get('/anotherRoute', timeLogger, (req, res)=>{
  // console.log('Time:', Date.now())
  res.send("anotherRoute")
})

```
or define this middleware as a *global* using the `app.use` so we don't have to add the middleware into each route:


```js
function timeLogger (req, res, next){
  console.log('Time:', Date.now())
  next() // Boo! 
}

const express = require('express')
const app = express()
app.listen(5000)
app.use(timeLogger)
app.get('/', (req, res)=>{
  // console.log('Time:', Date.now())
  res.send("home")
})
app.get('/anotherRoute', (req, res)=>{
  // console.log('Time:', Date.now())
  res.send("anotherRoute")
})

```
It is important to pass it on the middleware to the next using `next`

or 

```js
timeLogger = (fn) => {
  console.log('Time:', Date.now())
  return (req, res, next) => {
    fn(req, res, next)
  }
}

const express = require('express')
const app = express()
app.listen(5000)

app.get('/', timeLogger((req, res) => {
  // console.log('Time:', Date.now())
  res.send("home")
}))

app.get('/anotherRoute', timeLogger((req, res) => {
  // console.log('Time:', Date.now())
  res.send("anotherRoute")
}))

```


We can also narrow down the applicable routes of a middleware using `app.use`:
```js
app.use('/api/v1', timeLogger)
```
This will apply the middleware to all the routes that starts with `/api/v1`

# Multiple Middleware Functions
```js
app.use(r1, r2)
app.use([r1, r2])
```
or
```js
app.METHOD(route, r1, r2, ()=>{})
app.METHOD(route, [r1, r2], ()=>{})
```
# Middleware Options
- Your own
- Express.JS built-in (express.static, express.json, session)
- Third party (helmet, cors, passport, morgan )
[Check more!](http://expressjs.com/en/resources/middleware/morgan.html)

# `next` vs return `next()`
https://stackoverflow.com/questions/16810449/when-to-use-next-and-return-next-in-node-js
![next vs return next](https://cdn.discordapp.com/attachments/1016552851322978434/1027345875577610343/unknown.png)

# `next` vs `next('route')`

```js

//routes
app.get('/users', (req, res, next) => {
  console.log("1");
  next()
}, (req, res, next) => {
  console.log("2");
  // res.send("users2")
  next()
}, (req, res, next) => {
  console.log("3");
  next()
})

app.get('/users', (req, res) => {
  console.log("4");
  res.send("users")
})

```

Output
```
1
2
3
4
```

where as


```js

//routes
app.get('/users', (req, res, next) => {
  console.log("1");
  next()
}, (req, res, next) => {
  console.log("2");
  // res.send("users2")
  next()
}, (req, res, next) => {
  console.log("3");
  next()
})

app.get('/users', (req, res) => {
  console.log("4");
  res.send("users")
})

```

Output
```
1
2
4
```
