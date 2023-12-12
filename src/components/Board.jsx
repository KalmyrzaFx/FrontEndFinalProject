// Board.jsx
import React, { useState, useEffect } from 'react';
import { fetchRandomDogImage, fetchRandomCatImage } from '../api.jsx';
import './Board.css'; // Import your CSS file for styling

const Board = () => {
  const [pieces, setPieces] = useState([]);

  const initializePieces = async () => {
    const catImage = await fetchRandomCatImage();
    const dogImage = await fetchRandomDogImage();

    const initialPieces = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          // Dark squares
          initialPieces.push(null);
        } else {
          // Light squares with initial pieces for the first 3 rows and last 3 rows
          const team = row < 3 ? 'cat' : row > 4 ? 'dog' : null;
          const piece = team ? { id: `${row}-${col}`, team, imageUrl: team === 'cat' ? catImage : dogImage } : null;
          initialPieces.push(piece);
        }
      }
    }

    setPieces(initialPieces);
  };

  useEffect(() => {
    initializePieces();
  }, []);

  return (
    <div className="board">
      {pieces.map((piece, index) => (
        <div key={index} className={`square ${piece && piece.team ? piece.team : ''}`}>
          {piece && piece.imageUrl && <img src={piece.imageUrl} alt={`checker piece ${piece.id}`} className="checker-piece" />}
        </div>
      ))}
    </div>
  );
};

export default Board;
