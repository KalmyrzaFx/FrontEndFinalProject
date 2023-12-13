// Square.js
import React from 'react';
import Piece from './Piece';

export default function Square({ id, piece, handleClick }) {
  let isWhite = false;
  if ((id[0] % 2 !== 0 && id[1] % 2 !== 0) || (id[0] % 2 === 0 && id[1] % 2 === 0)) {
    isWhite = true;
  }

  return (
    <button id={id} className={'square ' + (isWhite ? 'white ' : 'black ')} onClick={handleClick}>
      <Piece color={piece.color} image={piece.image}></Piece>
    </button>
  );
}
