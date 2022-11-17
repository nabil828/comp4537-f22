import React from 'react'

function SearchBar({ search, setSearch }) {
  const onChangeFunctionHandle = (e) => {
    setSearch({ ...search, 'text': e.target.value })
  }
  const onChangeFunctionHandleCheckBox = (e) => {
    setSearch({ ...search, 'inStock': e.target.checked })
  }

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={onChangeFunctionHandle} />
      <br />
      <label htmlFor="x" >Only show products in stock</label>
      <input type="checkbox" name="x" onChange={onChangeFunctionHandleCheckBox} />
    </div>
  )
}

export default SearchBar