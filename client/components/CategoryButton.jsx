import React, { useState, useEffect } from 'react'

function CategoryButton (props){
  const [category, handleCategory] = useState(props.category); // State update

  return (
    <button onClick={() => {
      props.func.setCategory(props.category); 
      // props.func.getUrls(props.category);
      props.func.setModal(props.func.flipModal);
    }}>{props.category}</button>
  )
}

export default CategoryButton;