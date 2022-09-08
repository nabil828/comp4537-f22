import React, { useEffect, useState } from 'react'
import City from './City'
function Cities() {
  const [cities, setCities] = useState([])
  const url = "http://localhost:5000/cities"

  useEffect(() => {
    fetch(url)
      .then((resp) => { return resp.json() })
      .then((jsonedResp) => { setCities(jsonedResp) })


  }, [])

  return (
    <>Cities Componet
      <hr />
      {

        cities.map((aCity) => {
          return <City aCity={aCity} />
        })
      }
      <hr />
    </>
  )
}

export default Cities