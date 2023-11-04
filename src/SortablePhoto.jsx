// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import {Photo} from './Photo';

export const SortablePhoto = (props) => {
  const[isChecked, setIsChecked] = useState(false)
  // eslint-disable-next-line react/prop-types
  // some useful props from dnd-kit package.
  const sortable = useSortable({id: props.url});
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = sortable;

  // some CSS from dnd-kit utilities package which provides seamless transition while sorting
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // handles the state of selected images
  function handleCheckedItem(event){
    if (event.target.checked === true){
      // eslint-disable-next-line react/prop-types
      props.setDeleteItem([...props.deleteItem, props.index])
      setIsChecked(true)
    }
    else{
      // eslint-disable-next-line react/prop-types
      props.setDeleteItem(props.deleteItem.filter((item)=> item !== props.index))
      setIsChecked(false)
    }
  }
  return (
      // eslint-disable-next-line react/prop-types
    <div className={`image-container ${props.index === 0 ? "col-span-2 row-span-2" : ""}`}>
      <input type="checkbox" className={`${isDragging ? 'hidden' : 'overlay-checkbox'}`} onChange={handleCheckedItem}/>

      {/*this overlay is responsible for the checked image overlay*/}
      <div className="overlay-div"></div>

      {/*photo jsx element*/}
      <Photo
          ref={setNodeRef}
          style={style}
          {...props}
          {...attributes}
          {...listeners}
          checked={isChecked}
      />
    </div>
  );
};
