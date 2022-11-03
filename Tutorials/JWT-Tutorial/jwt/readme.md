# Solution III - JSON Web Tokens (JWT)
JWTs help to solve the same problem Cookies and Session try to solve; identifying and trusting requests. However, it uses tokens to pass the state back and forth between a server and a client. It is the popular authentication method for API servers. It allows a client to use the same JWT token across multiple servers.

## Example - How to Authenticate a User using Sessions?

```js
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const jwtSecret = "unicorns are awesome and so are rainbows";

app.use(express.json());


app.listen(5000, () => {
  console.log('Server is running on port 5000');
})


app.get('/login', (req, res) => {
  res.send("<form action='/login' method='POST'><input type='text' name='username' value='admin' placeholder='username'><input type='password' name='password' value='1234' placeholder='password'><button type='submit'>Login</button></form>");
})

app.use(express.urlencoded());

app.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.username === 'admin' && req.body.password === '1234') {
    // res.cookie('auth', 'true');
    // req.session.auth = 'true';
    res.json({ status: 'success', token: jwt.sign({ username: 'admin' }, jwtSecret) });
    console.log('Login success');
    // res.redirect('/admin'); // redirect to admin page
  }
  else {
    res.send('Invalid username or password');
  }
})

app.post('/admin', (req, res) => {
  // const { auth } = req.cookies;
  // const { auth } = req.session;
  // if (auth && auth === 'true') {
  //   res.send('Welcome to the protected route, logged in user');
  // }
  // else {
  //   res.redirect('/login');
  // }
  jwt.verify(req.body.token, jwtSecret, function (err, decoded) {

    if (!err) {
      res.send('Welcome to the protected route, logged in user');
    }
    else {
      // res.send('Invalid token');
      console.log('Invalid token');
      // res.redirect('/login');
      res.json('Invalid token')
    }
  })

})
```