import React from 'react'

function ProductRow({ product }) {
  return (
    <div>{product.name}, price is {product.price}.
      {product.stocked ? 'In stock' : 'Out of stock'}
    </div>
  )
}

export default ProductRow