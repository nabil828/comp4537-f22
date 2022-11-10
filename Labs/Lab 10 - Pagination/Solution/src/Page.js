import React from 'react'

function page({ currentPokemons, currentPage }) {
  return (
    <div>
      <h1>
        Page number {currentPage}
      </h1>
      {
        currentPokemons.map(item => {
          return <div>  {item.name.english} id is {item.id} </div>
        })
      }
    </div>
  )
}

export default page