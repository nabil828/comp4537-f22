import React from 'react'

function ProductRow({ item }) {
  return (
    <div key={item.name}> {item.name}, price: {item.price}, in Stock: {item.stocked.toString()}</div>
  )
}

export default ProductRow