const express = require('express');
const app = express();
// const cookieParser = require('cookie-parser');
var session = require('express-session')


app.listen(5000, () => {
  console.log('Server is running on port 5000');
})

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