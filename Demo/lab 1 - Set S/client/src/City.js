import React from 'react'

function City({ aCity }) {
  // console.log(props)
  // const { aCity } = props

  const { name, description, tempreture } = aCity
  return (
    <div>{name} temp is {tempreture}

      <hr />
      <p>
        {description}
      </p>
    </div>
  )
}

export default City