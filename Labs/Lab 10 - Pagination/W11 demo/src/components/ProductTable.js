import React, { useRef } from 'react'
import ProductCategoryRow from './ProductTable/ProductCategoryRow'
import ProductRow from './ProductTable/ProductRow'

function ProductTable({ products, inputs }) {
  console.log('inputs', inputs);


  const visitedCategories = useRef([])
  visitedCategories.current = []
  const add_category_to_visited = (category) => {
    if (!visitedCategories.current.includes(category)) {
      visitedCategories.current.push(category)
    }
  }
  return (
    <div>
      {
        products.map((product) => {
          if (product.name.indexOf(inputs.text) === -1) {
            return null
          }
          if (inputs.stocked && !product.stocked) {
            return null
          }
          return (
            <>
              {(visitedCategories.current.indexOf(product.category) == -1) && <ProductCategoryRow category={product.category} />}
              <ProductRow product={product} key={product.name} />
              {add_category_to_visited(product.category)}
            </>
          )

        })
      }
    </div>
  )
}

export default ProductTable