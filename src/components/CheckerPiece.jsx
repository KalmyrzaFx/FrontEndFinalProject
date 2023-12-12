// CheckerPiece.jsx
import React from 'react';

const CheckerPiece = ({ imageUrl }) => {
  return imageUrl ? (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <img
        src={imageUrl}
        alt="checker piece"
        className="checker-piece"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  ) : null;
};

export default CheckerPiece;
