// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import {Photo} from './Photo';

export const SortablePhoto = (props) => {
  const sortable = useSortable({id: props.url});
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function handleCheckedItem(event){
    if (event.target.checked === true){
      // eslint-disable-next-line react/prop-types
      props.setDeleteItem([...props.deleteItem, props.index])
    }
    else{
      // eslint-disable-next-line react/prop-types
      props.setDeleteItem(props.deleteItem.filter((item)=> item !== props.index))

    }
  }
  return (
    <div className={`image-container ${props.index === 0 ? "col-span-2 row-span-2" : ""}`}>
      <input type="checkbox" className={`${isDragging ? 'hidden' : 'overlay-checkbox'}`} onChange={handleCheckedItem}/>
      <Photo
          ref={setNodeRef}
          style={style}
          {...props}
          {...attributes}
          {...listeners}
      />
    </div>
  );
};
