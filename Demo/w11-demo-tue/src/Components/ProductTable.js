import React, { useRef } from 'react'

function ProductTable({ data, search }) {
  // console.log(search);
  const visitedCategories =([])
  visitedCategories.current = []
  const addCategoryToVisitedCategories = (category) => {
    if (!visitedCategories.current.includes(category)) {
      visitedCategories.current.push(category)
    }
  }

  return (
    <div>
      {
        data.map((item) => {
          return (
            <div>
              {
                (
                  search.inStock === item.stocked
                  &&
                  item.name.indexOf(search.text) !== -1
                ) &&
                <>
                  {(!visitedCategories.current.includes(item.category)) && item.category}
                  <br />
                  {
                    (item.stocked === true) ?
                      <span style={{ color: 'green' }} >{item.name}</span>
                      :
                      <span style={{ color: 'red' }} >{item.name}</span>
                  }, {item.price}, {item.category}
                  {addCategoryToVisitedCategories(item.category)}
                </>
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductTable