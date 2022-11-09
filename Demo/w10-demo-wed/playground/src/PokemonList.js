import React, { useEffect, useState } from 'react'
import Pokemon from './Pokemon'

function PokemonList() {
  const [pokemon, setPokemon] = React.useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/pokemons')
      .then(res => res.json())
      .then(data => {
        setPokemon(data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>PokemonList</h1>
      {
        pokemon.map(pokeElement => {
          return <div> <Pokemon x={pokeElement} y="dummy" /></div>
        })
      }
    </>
  )
}

export default PokemonList