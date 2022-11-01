# Solution II - Sessions
<blockquote>
When you work with an application, you open it, do some changes, and then you close it. This is much like a Session. The computer knows who you are. It knows when you start the application and when you end. But on the internet there is one problem: the web server does not know who you are or what you do, because the HTTP address doesn't maintain state.

Session variables solve this problem by storing user information to be used across multiple pages (e.g. username, favorite color, etc). By default, session variables last until the user closes the browser.

So; Session variables hold information about one single user, and are available to all pages in one application.
</blockquote>


<!-- TODO  Draw the Analogy--> 
<!-- https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/ -->

## How to Authenticate a User using Sessions?

```js
const express = require('express');
const app = express();
// const cookieParser = require('cookie-parser');
var session = require('express-session')


app.listen(5000, () => {
  console.log('Server is running on port 5000');
})
// app.use(cookieParser());

app.use(session({
  secret: 'hello world',
  resave: true,
  saveUninitialized: true
}))

app.get('/login', (req, res) => {
  res.send("<form action='/login' method='POST'><input type='text' name='username' value='admin' placeholder='username'><input type='password' name='password' value='1234' placeholder='password'><button type='submit'>Login</button></form>");
})

app.use(express.urlencoded());

app.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.username === 'admin' && req.body.password === '1234') {
    // res.cookie('auth', 'true');
    req.session.auth = 'true';
    console.log('Login success');
    res.redirect('/admin'); // redirect to admin page
  }
  else {
    res.send('Invalid username or password');
  }
})

app.get('/admin', (req, res) => {
  // const { auth } = req.cookies;
  console.log(req.session);
  const { auth } = req.session;
  if (auth && auth === 'true') {
    res.send('Welcome to the protected route, logged in user');
  }
  else {
    res.redirect('/login');
  }
})
```

You may `express-session` store options to choose where to store the session object. The default storage is the sever memory. However, this is might not be best option since it is not a persistent storage. Alternatively, you may choose to store the session object in a file on the server side:

```js
var FileStore = require('session-file-store')(session);

app.use(session({
  store: new FileStore,
  secret: 'hello world',
  resave: true,
  saveUninitialized: true
}))
```
or in a db:

```js
var MongoDBStore = require('connect-mongodb-session')(session);

var dbStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions'
});

app.use(session({
  store: dbStore,
  secret: 'hello world',
  resave: true,
  saveUninitialized: true
}))
```

You have to install the `session-file-store` and `connect-mongodb-session` for these options.