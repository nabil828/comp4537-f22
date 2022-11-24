import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login'
import {
  BrowserRouter as Router
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>
      <Router>
        <Login />
      </Router>
    </h1>
  </React.StrictMode>
);
