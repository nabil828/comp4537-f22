import React from 'react'
import ProductRow from './ProductTable Components/ProductRow'
import ProductCategoryRow from './ProductTable Components/ProductCategoryRow'
function ProductTable({ data, searchInputs }) {
  const visitedCategories = []
  const addVisitedCategory = (category) => {
    if (!visitedCategories.includes(category)) {
      visitedCategories.push(category)
    }
  }

  return (
    <div>
      {
        data.map(item => {
          return (
            <>
              {(visitedCategories.indexOf(item.category) === -1)
                && <ProductCategoryRow item={item} />}

              {
                (item.name.toLowerCase().includes(searchInputs.filterText.toLowerCase()))
                &&
                (searchInputs.inStock && item.stocked || !searchInputs.inStock)
                &&
                <ProductRow item={item} />
              }

              {
                addVisitedCategory(item.category)
              }
            </>
          )
        })
      }
    </div>
  )
}

export default ProductTable