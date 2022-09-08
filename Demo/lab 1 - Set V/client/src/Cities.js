import React, { useEffect, useState } from 'react'
import City from './City'
function Cities() {

  const [cities, setCities] = useState([])
  const url = "http://localhost:5000/cities"
  useEffect(() => {
    fetch(url)
      .then((resp) => { return resp.json() })
      .then((jsonedResp) => {
        console.log(jsonedResp);
        setCities(jsonedResp)
      })
  }, [])

  return (
    <>
      Cities Component
      <hr />
      {cities.map((aCity) => {
        return <City aCity={aCity} />
      })}
    </>
  )
}

export default Cities