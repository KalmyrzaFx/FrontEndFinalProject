import React from 'react';
import CheckerPiece from './CheckerPiece.jsx';

const Square = ({ imageUrl }) => {
  return (
    <div className="square">
      {imageUrl && <CheckerPiece imageUrl={imageUrl} />}
    </div>
  );
};

export default Square;

