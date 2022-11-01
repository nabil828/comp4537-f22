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

