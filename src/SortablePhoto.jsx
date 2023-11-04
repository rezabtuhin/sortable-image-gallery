// eslint-disable-next-line no-unused-vars
import React from 'react';
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
    <div
    style={{
      // eslint-disable-next-line react/prop-types
      gridRowStart: props.index === 0 ? 'span 2' : null,
      // eslint-disable-next-line react/prop-types
      gridColumnStart: props.index === 0 ? 'span 2' : null,
    }}
    className="image-container"
    >
      <input type="checkbox" className="overlay-checkbox" onChange={handleCheckedItem}/>
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
