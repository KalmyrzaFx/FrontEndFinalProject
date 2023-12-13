// Piece.js
import React from 'react';

export default function Piece({ color, image }) {
  let char = '●';

  function determineColor() {
    if (color === '0') {
      return 'red';
    } else if (color === '1') {
      return 'blue';
    } else if (color === '11') {
      char = '★';
      return 'blue queen';
    } else if (color === '00') {
      char = '★';
      return 'red queen';
    } else if (color === '+') {
      return 'highlighted';
    } else {
      return 'empty';
    }
  }

  return (
    <div className={'piece ' + determineColor()}>
      {color !== ' ' ? (image ? <img src={image} alt={`Piece ${color}`} /> : char) : ' '}
    </div>
  );
}
