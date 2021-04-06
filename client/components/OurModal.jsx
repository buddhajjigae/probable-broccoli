// - Listens to the click events
// - When a click event happens, invokes a fetch request to the database
//     DB：GET /wardrobe/accessories
// - .then Displays Modal invoking Modal.jsx passing the result of the GET request

import React, { useState, useEffect } from 'react';
import AddItem from './AddItem';
import MultipleItemsDisplay from './MultipleItemsDisplay';

export const GlobalContext = React.createContext({}); // To pass state to children

function OurModal(props) {
  const [myItems, setItems] = useState('');
  const [pictureUrls, setUrls] = useState([]);
  const [itemIDs, setIDs] = useState(''); 
  const [hasItCalled, setHasItCalled] = useState(false);

  // getUrls function which will be used by CategoryButton and OurModal.jsx 
  // to send GET requests for category items view
  const getUrls = (category) => {
    // wardrobeController.getItemByType handling, will return the whole table
    fetch(`/wardrobe/getItems/${category}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .then(() => {
        let tempURLs = [];
        let tempIDs = [];
        for(let i = 0; i < myItems.length; i++) {
          tempURLs.push(myItems[i].url);
          tempIDs.push(myItems[i].id);
        }
        setUrls(tempURLs);
        setIDs(tempIDs);
        setHasItCalled(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!hasItCalled) getUrls(props.category);
  });
  
  return(
    <div>
      {/* AddItem instance is a button that will send POST request to the backend server to add item for the user */}
      <AddItem category = {props.category}></AddItem>
      {/* MultipleItemsDisplay will display all the items belong to the user within the right category.
      For example: All the tops user owns */}
      <MultipleItemsDisplay 
      urls = {pictureUrls}   
      ids = {itemIDs}  
      category = {props.category} 
      draft = {props.draft}
      changeDraft = {props.changeDraft}
      ></MultipleItemsDisplay>
    </div>
  );
}

export default OurModal;
