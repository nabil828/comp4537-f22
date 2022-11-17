import React, { useState } from 'react'
import SearchBar from './SearchBar'
import ProductTable from './ProductTable'

function FilterableProductTable() {
  const data = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
  ];
  const [search, setSearch] = React.useState({
    text: '',
    inStock: false
  });

  return (
    <div>
      <SearchBar setSearch={setSearch} search={search} />
      <ProductTable data={data} search={search} />
    </div>
  )
}

export default FilterableProductTable