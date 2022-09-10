import React from 'react'

function City({ z }) {
  console.log(z);
  const { description, name, tempreture } = z
  return (
    <div>
      City {name} temperature is {tempreture}  and the weather description is {description}
      <hr />
    </div>
  )
}

export default City