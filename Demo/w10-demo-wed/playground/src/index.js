import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import PokemonList from './PokemonList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Header />
    <PokemonList />
  </>
);

