import React from 'react'

function City({ aCity }) {
  const { tempreture, name, description } = aCity;

  return (
    <div>
      <h4>
        {name} temp. is {tempreture}
      </h4>
      <p>
        {name} weather {description}
      </p>
      <hr />
    </div>
  )
}

export default City