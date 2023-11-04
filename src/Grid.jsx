// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
export function Grid({children}) {

  function uploadImage(){
    console.log("Button clicked")
  }
  return (
    // parent layout of image gallery
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 lg:gap-5 md:gap-5 sm:gap-3 gap-3">
      {children}
      <div className="button-div" onClick={uploadImage}/>
    </div>
  );
}
