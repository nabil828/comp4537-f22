import React from 'react'

function SearchBar({ inputs, setInputs }) {

  const searchOnChange = (e) => {
    // e.preventDefault();
    setInputs({ ...inputs, text: e.target.value });
  }

  const stockOnChange = (e) => {
    // e.preventDefault();
    setInputs({ ...inputs, stocked: e.target.checked ? true : false });
  }

  return (
    <div>
      <input type="text" placeholder="Search.." onChange={searchOnChange} />
      <br />
      <label htmlFor="stock"> Only show products in stock</label>
      <input name="stock" type="checkbox" onChange={stockOnChange} />
    </div>
  )
}

export default SearchBar