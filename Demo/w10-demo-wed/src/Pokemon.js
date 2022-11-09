import React from 'react'

function Pokemon(probs) {
  console.log(probs);
  const { x, y } = probs

  return (
    <div>
      Pokemon name is {x.name.english}
      Pokemon HP is {x.base.HP}
    </div>
  )
}

export default Pokemon