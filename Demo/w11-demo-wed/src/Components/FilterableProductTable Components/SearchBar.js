import React from 'react'

function SearchBar({ searchInputs, setSearchInputs }) {

  const textOnChangeFunctionHandle = (e) => {
    setSearchInputs({ ...searchInputs, filterText: e.target.value })
  }

  const checkboxOnChangeFunctionHandle = (e) => {
    setSearchInputs({ ...searchInputs, inStock: e.target.checked })
  }

  return (
    <div>
      <input type="text" placeholder='Search..' onChange={textOnChangeFunctionHandle} />
      <br />
      <input type="checkbox" id="x" onChange={checkboxOnChangeFunctionHandle} />
      <label htmlFor="x">Only show products in stock</label>
      <hr />
    </div>
  )
}

export default SearchBar