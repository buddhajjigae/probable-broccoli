// 6. MultipleItemsDisplay.jsx
// ----------------------------------------------------------------------
// Input: category name, user id
// Renders: Multiple Items Display box
//                Previously saved items (if any)
// Child Compoents: ItesDisplay.jsx
//                   <ItemDisplay imgUrl = 'http://abc.com/xxx.jpg'
//                                category ='tops'
//                                userId = 'asefjowef83r8',
//                                itemId = ''>
// ----------------------------------------------------------------------
// - Displays Category name
// - Invokes GET request to DB with category name and userId
//   -DB：GET /wardrobe/accessories
//   - If items exist, displays the ItemDisplay boxes (with pictures and buttons)
//   - If no items were found, do nothing

import React, { useState, useEffect } from 'react';
import AddRemoveOutfit from './AddRemoveOutfit';

export const GlobalContext = React.createContext({}); // To pass state to children
function MultipleItemsDisplay(props) {
  // State update with passed down urls of all items 
  // in category that user owns
  const [urls, handleUrls] = useState(props.urls);
  const [ids, handleIDs] = useState(props.ids);

  let imgArray = [];

  for (let i = 0; i < props.urls.length; i++) {
    imgArray.push(
      <div>
        <img src={props.urls[i]} width="120px" height="120px"></img>
        {/* instantiate AddRemoveOutfit button. Need to pass the url,
         the item_id, category and the method to alter the parent state*/}
        <AddRemoveOutfit category = {props.category} url={props.urls[i]} id = {props.ids[i]}
        draft = {props.draft} changeDraft = {props.changeDraft}
        ></AddRemoveOutfit>
      </div>
    );
  }

  return (
    <div>
      {/* instantiate the array of images*/}
      {imgArray}
    </div>
  )
}

export default MultipleItemsDisplay;
