# Step 1 - The login form
- design Login Component
- enable the `cors` 

```js
import React, { useState } from 'react'
import axios from 'axios'


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      // ?
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      
        <form onSubmit={handleSubmit}>
          <span> Admin Login </span>
          <br />
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">
            Login
          </button>
        </form>
      
    </div>
  )
}

export default Login
```

# Step 2 - Conditional Rendering
now we display the `Dashboard` component if the login is successful
```js

import React, { useState } from 'react'
import axios from 'axios'
import Dashboard from './Dashboard';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {user?.username ? (
        <>
          <h1>Welcome {user.username}</h1>
          <Dashboard />
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <span> Admin Login </span>
          <br />
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default Login
```


# Step 3 - React Router
Suppose the `Dashboard` component has five `Report` components that we need to be accessing and redirected to in a new frontend route, i.e. `/report/1`.
Two problems arise here:
- First, how to authorize the user to these routes without asking the user to login again.
- Second, how to create the route themselves. 

Let us start with the router.


# Step 4 - another AJAX request to get the report(S) 

server-> client
allow access to headers using `cors`
https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b

# Step 5 - Refresh Token
using axios interceptors
```js
  const refreshToken = async () => {
    try {
      const res = await axios.post("/refresh", { token: user.refreshToken });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  ```