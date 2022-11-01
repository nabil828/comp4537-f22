How do you make a server remember or trust a visitor?


# Solution I - Cookies
According to w3.org, cookies are defined as:

> “bits of text stored on the client machine and sent with the HTTP request to the Web site for which they were created.”

## Example
In the following example, you can send Cookies from a server to a client using the `res.cookie` Express function. In this example, the server asks the browser to store a little piece of data in a Cookie.

```js
const express = require('express');
const app = express();

app.listen(5000, () => {
  console.log('Server is running on port 5000');
})

app.get('/', (req, res) => {
  res.cookie("sea", "blue");
  res.cookie("land", "green");

  res.send('Hello World');
})
```
You may check the received Cookies on the client side using the *Application* tab in Chrome Dev. Tools:
![application tab](https://cdn.discordapp.com/attachments/1017862173881544775/1036513101148864532/unknown.png).

These two cookies will be stored persistently in the browser. This means this cookies are visible even if you close and re-opened your browser or if you opened a new tab or window. Also, if you remove the `res.cookie` functions from the server, these Cookies will persist on the client side.

You may also access the Cookie pragmatically on the client side using `document.cookie` :
![Cookie](https://cdn.discordapp.com/attachments/1017862173881544775/1036513849135857735/unknown.png)

What make Cookies useful, is the fact that the browser will send along any and all the Cookies for the domain in question back to the server for each and every request. 

![Piggyback](https://cdn.discordapp.com/attachments/1017862173881544775/1036521468332343357/unknown.png)

To read the Piggyback Cookies on server side, you may use `cookie-parser` middleware:

```js
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.listen(5000, () => {
  console.log('Server is running on port 5000');
})
app.use(cookieParser());
app.get('/', (req, res) => {
  // res.cookie("sea", "blue");
  // res.cookie("land", "green");

  console.log(req.cookies);

  res.send('Hello World');
})
```

Output
```js
{ sea: 'blue', land: 'green' }
```

You may try to change the cookie on the browser side using the dev. tools and this change will reflect on the server side.

Last note, cookies will be send to server regardless of the HTTP request type. 

## Cookies Options
You may want to set some Cookies option using the third parameter of `res.cookie`:

```js
res.cookie("land", "green", { httpOnly: true, maxAge: 6000 });
```

You may check all the options from https://expressjs.com/en/api.html : 
![cookie options](https://cdn.discordapp.com/attachments/1017862173881544775/1036540874152226866/unknown.png)

The previous option, `httpOnly: true`, will prevent some attacks. More on this later.

## How to Authenticate a User using Cookies?
Initially when users accesses your server, they will prompted for their registered username and password. Once given, they make themselves known to the server so they don't have to re-assert their identity for each subsequent request. 

One way for the server to track who have successfully logged in? One way, is to use Cookies.   


Here is the code 

```js
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.listen(5000, () => {
  console.log('Server is running on port 5000');
})
app.use(cookieParser());

app.get('/login', (req, res) => {
  res.send("<form action='/login' method='POST'><input type='text' name='username' value='admin' placeholder='username'><input type='password' name='password' value='1234' placeholder='password'><button type='submit'>Login</button></form>");
})

app.use(express.urlencoded());

app.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.username === 'admin' && req.body.password === '1234') {
    res.cookie('auth', 'true');
    console.log('Login success');
    res.redirect('/admin'); // redirect to admin page
  }
  else {
    res.send('Invalid username or password');
  }
})

app.get('/admin', (req, res) => {
  const { auth } = req.cookies;
  if (auth && auth === 'true') {
    res.send('Welcome to the protected route, logged in user');
  }
  else {
    res.redirect('/login');
  }
})
```

### CSRF
> Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated.

For the previous example, an attacker with the following code can access the *admin* route:
```html
  <h1> Bad Guy Site Pretending To Be a Good Site</h1>

  <form action="http://localhost:5000/admin">
    <button> 💲💲Click me if you want to redeem a prize money 💲💲</button>
  </form>
```

#### CSRF Protection
Source - https://github.com/pillarjs/understanding-csrf
```js
const express = require('express');
const app = express();
const csurf = require("tiny-csrf");
const session = require('express-session');
const cookieParser = require("cookie-parser");


app.listen(5000, () => {
  console.log('Server is running on port 5000');
})

app.use(express.urlencoded());
app.use(cookieParser("cookie-parser-secret"));

app.use(session({ secret: "keyboard cat" }));
app.use(csurf("123456789iamasecret987654321look"));


app.get('/login', (req, res) => {
  res.send(`
  <form action='/login' method='POST'>
    <input type='text' name='username' value='admin' placeholder='username'>
    <input type='password' name='password' value='1234' placeholder='password'>
    <button type='submit'>Login</button>
    <input type='hidden' name='_csrf' value='${req.csrfToken()}'>
  </form>
  `);
})



app.post('/login', (req, res) => {
  if (req.body.username === 'admin' && req.body.password === '1234') {
    res.cookie('auth', 'true');
    console.log('Login success');
    res.redirect('/admin'); // redirect to admin page
  }
  else {
    res.send('Invalid username or password');
  }
})

app.get('/admin', (req, res) => {
  const { auth } = req.cookies;
  if (auth && auth === 'true') {
    console.log('Welcome to the protected route, logged in user');
    res.send('Welcome to the protected route, logged in user');
  }
  else {
    res.redirect('/login');
  }
})

``` 


