// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
export function Grid({children}) {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5">
      {children}

    </div>
  );
}
