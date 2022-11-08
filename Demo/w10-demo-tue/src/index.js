import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import PokeList from './PokeList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Header />
    <PokeList />
  </>
);

