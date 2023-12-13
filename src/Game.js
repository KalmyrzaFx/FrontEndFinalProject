import { useEffect, useState } from "react";
import Board from "./Board";
import {redWon, blueWon} from "./utils"

export default function Game(){
    const [redToMove, setRedToMove] = useState(false)
    const [text, setText] = useState('Cats to move')
    const [board, setBoard] = useState([
      [' ', '0', ' ', '0', ' ', '0', ' ', '0'],
      ['0', ' ', '0', ' ', '0', ' ', '0', ' '],
      [' ', '0', ' ', '0', ' ', '0', ' ', '0'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['1', ' ', '1', ' ', '1', ' ', '1', ' '],
      [' ', '1', ' ', '1', ' ', '1', ' ', '1'],
      ['1', ' ', '1', ' ', '1', ' ', '1', ' ']
    ])

    async function makeMove() {
      setRedToMove(!redToMove);
      const currentPlayer = redToMove ? "Cats" : "Dogs";
      setText(`${currentPlayer} to move`);
    }

    useEffect(() => {
      if(redWon(board)){
        setText("DOGS WINS !!!")
      }
      else if (blueWon(board)){
        setText("CATS WINS !!!")
      }
    }, [board])

    const handleReset = () => {
      // Reload the page to reset the game
      window.location.reload();
    };

    return (
      <div style={{ textAlign: "center", fontSize: "20px", margin: "0px",color: "darkgreen" }}>
        <h1>Checkers Game:🐱 vs 🐶</h1>
        <h2>{text}</h2>
        <Board
          id={Board}
          redToMove={redToMove}
          moveMade={makeMove}
          board={board}
          setBoard={setBoard}
        ></Board>
        <button onClick={handleReset}>Reset Game</button>
      </div>
    );
  }
  