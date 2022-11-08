import React, { useEffect, useState } from 'react'
import Pokemon from './Pokemon'

function PokeList() {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/pokemons')
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      PokeList
      {
        pokemon.map(poke => {
          return <Pokemon pokemonProb={poke} y="banana" />
        }
        )
      }
    </>
  )
}

export default PokeList