# Express.JS
Express.js is a Node.js framework that we will use to build the server app. It is defined as
  >Fast, unopinionated, minimalist web framework for Node.js

It allows us to use Express.Js  [`middleware`s](http://expressjs.com/en/guide/using-middleware.html) which we are going to use to handle session and other web server vital tasks.

# REST API
> [[Source]](https://rapidapi.com/blog/most-popular-api/) API stands for Application Programming Interface and allows your application to interact with an external service using a simple set of commands.

out of 10,000 APIs out there in the wild, we will be creating an API to get *unicorns*. [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) stands for Representational state transfer which is an architectural stateless style to make designing web apps more scalable and secure.  

Table of Contents
=================

* [Express.JS](#expressjs)
* [REST API](#rest-api)
* [Table of Contents](#table-of-contents)
* [Installing Express.JS](#installing-expressjs)
* [Hello world example](#hello-world-example)
* [Basic routing](#basic-routing)
   * [Examples](#examples)
* [Serving static files in Express](#serving-static-files-in-express)
* [Route parameters](#route-parameters)
   * [Response methods](#response-methods)
* [req.body](#reqbody)

# Installing Express.JS 

1 - Create a directory 
```
mkdir myapp
$ cd myapp
```
and initialize a Node.js repository 
```
$ npm init
```
Next, Install Express.Js dependency in your project.
```
$ npm install express

```

---
# Hello world example
```
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

Run the app with the following command:
```
$ node app.js
```

Then, load http://localhost:5000/ in a browser to see the output.

---
# Basic routing
> Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

```
app.METHOD(PATH, HANDLER)
```

## Examples

```
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Respond to POST request on the root route (/), the application’s home page:

```
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```
Respond to a PUT request to the /user route:

```
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```
Respond to a DELETE request to the /user route:

```
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

# Serving static files in Express
For example, use the following code to serve images, CSS files, and JavaScript files in a directory named public:

```
app.use(express.static('public'))
```
Now, you can load the files that are in the public directory:
```
http://localhost:5000/images/kitten.jpg
http://localhost:5000/css/style.css
http://localhost:5000/js/app.js
http://localhost:5000/images/bg.png
http://localhost:5000/hello.html
```

# Route parameters
> Route parameters are named URL segments that are used to capture the values specified at their position in the URL. 

- The captured values are populated in the req.params object.
- The name of the route parameter specified in the path as their respective keys.

Example 
```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```
To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

```
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
```


## Response methods
- The methods on the response object (res) in the following table can send a response to the client, and terminate the request-response cycle. 
- If none of these methods are called from a route handler, the client request will be left hanging.



|Method	              | Description|
|---------------------|------------|
|res.download()	      | Prompt a file to be downloaded.|
|res.end()	          | End the response process.|
|res.json()         	| Send a JSON response.|
|res.jsonp()	        | Send a JSON response with JSONP support.|
|res.redirect()     	| Redirect a request.|
|res.render()       	| Render a view template.|
|res.send()	          | Send a response of various types.|
|res.sendFile()	      | Send a file as an octet stream.|
|res.sendStatus()	    | Set the response status code and se|nd its string representation as the response body.|



# req.body
> Contains key-value pairs of data submitted in the request body. 

```js
const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json


app.post('/profile',  (req, res) => {
  console.log(req.body)
  res.json(req.body)
})
```