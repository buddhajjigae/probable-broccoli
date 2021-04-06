// 2. MainContainer.jsx (displays category boxes)
//     ---------------------------------------------------------------------------------
//     Input: User id
//     Renders: Menu buttons
//     Child Conponent: Modal.jsx <Modal category = 'tops' userId = 'asefjowef83r8'>
//                      * actual props should be variable names
// --------------------------------------------------------------------
// displaying Modal
// - Listens to the click events
// - When a click event happens, this component creates a Modal with the userId and category

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import OurModal from './OurModal';
import CategoryButton from './CategoryButton';
import '../stylesheets/style.css';

Modal.setAppElement('#root');
export const GlobalContext = React.createContext({}); // To pass state to children

function MainContainer(props) {
  const [category, setCategory] = useState(''); // State update
  const [showModal, setModal] = useState(false);
  // const [myItems, setItems] = useState(''); 
  // const [pictureUrls, setUrls] = useState(''); 
  // const [itemIDs, setIDs] = useState(''); 

  // create a useState hook to store and capture the specific Item to add to the outfit builder
  const [draftOutfit, updateDraftOutfit] = useState({
    accessory_id: '',
    accessory_url: '',
    top_id: '0',
    top_url: '',
    bottom_id: '',
    bottom_url: '',
    shoes_id: '',
    shoes_url: ''
  });
 

  // helper function to help modularize state flipping
  const flipModal = currentState => (currentState === false) ? true : false;
  
  // create categoryArray to loop through and instantiate several buttons in return
  const categoryButtons = []
  const categoryArray = ['accessories', 'tops', 'bottoms', 'shoes']
  // methods holder
  const categoryButtonMethods = {      
    setCategory : setCategory,
    setModal : setModal,
    flipModal : flipModal,
  }

  for (let i = 0; i< categoryArray.length; i += 1){
    // drill into CategoryButton the methods that CategoryButton can use
    categoryButtons.push(<CategoryButton category = {categoryArray[i]} func = {categoryButtonMethods}/>)
  }
  console.log(draftOutfit);
  return (
    <div id="myElement">
      {/* instantiate several buttons */}
      {categoryButtons}
      {category !== '' && (
        <Modal 
          style={{
              overlay: {
              position: 'fixed',
              top: 200,
              left: 0,
              right: 500,
              bottom: 0,
              backgroundColor: 'rgba(35, 255, 255, 0.75)'
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: 'white',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
            }}
          isOpen={showModal}>
          <button
            onClick={() => {
              setModal((currentState) =>
                currentState === false ? true : false
              );
            }}
          >
            Close
          </button>
          <OurModal userId={props.userId} category={category} showModal={showModal} 
        // after passing down all urls, also pass types down, currentItem and method to alter currentItem
        changeDraft = {updateDraftOutfit} draft = {draftOutfit}/>
        </Modal>
      )}
    </div>
  );
}

export default MainContainer;
