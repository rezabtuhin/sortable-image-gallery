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

  return <div ref={ref} style={inlineStyles} {...props} className="image-holder"/>;
});
