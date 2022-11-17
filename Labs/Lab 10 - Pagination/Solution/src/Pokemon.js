import React from 'react'

function Pokemon({ pokemon }) {
  const getThreeDigitId = (id) => {
    if (id < 10) return `00${id}`
    if (id < 100) return `0${id}`
    return id
  }

  return (
    <>
      <img src={`https://github.com/fanzeyi/pokemon.json/raw/master/images/${getThreeDigitId(pokemon.id)}.png`} />
    </>
  )
}

export default Pokemon