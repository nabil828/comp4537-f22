import React from 'react'

function Pokemon(probs) {
  const { pokemonProb, y } = probs

  return (
    <div>
      <h1>{pokemonProb.name.english}</h1>
      <h1>{pokemonProb.base.HP}</h1>
    </div>
  )
}

export default Pokemon