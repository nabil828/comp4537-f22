import React, { useEffect, useState } from 'react'
import City from './City'

function Cities() {
  const [cities, setCities] = useState([])
  const url = "http://localhost:5000/cities"
  useEffect(() => {
    fetch(url)
      .then((resp) => {
        return resp.json()
      })
      .then((jsonedResp) => {
        setCities(jsonedResp)
      })

  }, [])

  return (
    <div>
      Cities Components
      <hr />
      {
        cities.map((aCity) => {
          return <City z={aCity} x="y" />
        })
      }


    </div>
  )
}

export default Cities