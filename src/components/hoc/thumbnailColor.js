import React from 'react';

const thumbnailColor = (WrappedComponent) => {
  const colors = ['red', 'pink', 'orange', 'blue', 'green', 'yellow'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (props) => {
    return (
        <WrappedComponent {...props} color={randomColor} />
    )
  }
}

export default thumbnailColor;