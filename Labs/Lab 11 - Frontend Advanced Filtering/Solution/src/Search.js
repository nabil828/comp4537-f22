import React, { useEffect, useState } from 'react'

function Search({ types, checkedState, setCheckedState }) {

  const onChangeHandle = (type) => {
    const index = types.current.indexOf(type);
    const newCheckedState = checkedState.map((item, i) => i === index ? !item : item);
    setCheckedState(newCheckedState);
  }

  return (
    <div>
      {
        types.current.map(type => {
          return (
            <span key={type}>
              <input type="checkbox" name="pokeTypes" value={type} id={type} onChange={() => { onChangeHandle(type) }} />
              <label htmlFor={type}>{type}</label>
              <br />
            </span>
          )
        })
      }
    </div>
  )
}

export default Search