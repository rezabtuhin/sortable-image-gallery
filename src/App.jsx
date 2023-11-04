// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Grid } from "./Grid";
import { SortablePhoto } from "./SortablePhoto";
import { Photo } from "./Photo";
import {photos} from "./photos.jsx";

const App = () => {
  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [deleteItems, setDeleteItems] = useState([]);
  const show = deleteItems.length === 0 ? "hidden" : "";
  function toggleAllCheckboxes() {
    // setChecked(!checked);
  }
  const selectedText = deleteItems.length > 1 ? " Files" : " File";

  const textToShow =
    deleteItems.length !== 0 ? " " + deleteItems.length + selectedText + " Selected" : "Gallery";

  const deleteImage = () => {
    const deleteItemsSet = new Set(deleteItems)

    const updatedImage = items.filter((img, index) => !deleteItemsSet.has(index));
    setItems(updatedImage);
    setDeleteItems([]);
  };
  return (
    <div className="bg-white lg:m-14 md:m-11 sm:m-8 m-4">
      <div className="header lg:p-5 md:p-5 sm:p-3 p-3 flex items-center justify-between border-b-[1px] border-[#dddcdf]">
        <h1 className="font-bold">
          {deleteItems.length > 0 && (
            <input type="checkbox" checked onChange={toggleAllCheckboxes} />
          )}
          {textToShow}
        </h1>
        <button className={`text-red-600 ${show} delete-btn hover:underline`} onClick={deleteImage}>
          Delete {deleteItems.length > 1 ? "files" : "file"}
        </button>
      </div>
      <div className="lg:p-5 md:p-5 sm:p-3 p-3">

        {/*place where the drag and drop will work*/}
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
          {/*image to be sorted*/}
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {/*displaying images in a grid layout*/}
            <Grid>
              {items.map((url, index) => (
                  <SortablePhoto key={url} url={url} index={index} deleteItem={deleteItems} setDeleteItem={setDeleteItems}/>
              ))}
            </Grid>
          </SortableContext>

          {/*an overlay of current selected image while dragging*/}
          <DragOverlay adjustScale={true}>
            {activeId ? (
                <Photo url={activeId} index={items.indexOf(activeId)} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );

  // to keep track of image index when dragging starts
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  // operations when drag is done
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {

      // changing and updating the index of the image after dragging
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        // changing the `deleted` image index as it changes its index after dragging
        let newDeleteItems = []
        deleteItems.forEach((item) => {
          if (item === oldIndex){
            newDeleteItems.push(newIndex)
          }
          else if (newIndex <= item && oldIndex > item){
            newDeleteItems.push(item + 1)
          }
          else if (newIndex >= item && oldIndex < item){
            newDeleteItems.push(item - 1)
          }
          else{
            newDeleteItems.push(item)
          }
        })
        setDeleteItems(newDeleteItems)
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  // resetting the active image id after canceling the dragging
  function handleDragCancel() {
    setActiveId(null);
  }
};

export default App;
