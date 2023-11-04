// eslint-disable-next-line no-unused-vars
import React, {forwardRef} from 'react';

// eslint-disable-next-line react/display-name,react/prop-types
export const Photo = forwardRef(({url, index, faded, style, ...props}, ref) => {
  const inlineStyles = {
    opacity: faded ? '0.2' : '1',
    transformOrigin: '0 0',
    aspectRatio: 1,
    backgroundImage: `url("${url}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: "white",
    ...style,
  };

  // eslint-disable-next-line react/prop-types
  // since the mechanism is to set the images as background image of the divs, thus it utilizes the self-closing div as image holder it has some props and inline styling. also toggling the hover effect to be effective if the image is not checked. the prop is coming from SortablePhoto.jsx
  return <div ref={ref} style={inlineStyles} {...props} className={`image-holder ${props.checked ? "" : "hover-effect"}`}/>;
});
