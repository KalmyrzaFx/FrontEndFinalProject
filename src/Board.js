import { forwardRef, useState, useEffect } from "react";
import Square from "./Square";
import {removeHighlights, mutateTaking, getMovesBlue, getMovesRed, getMovesRedQueen, getMovesBlueQueen, copyBoard, 
  getForcedBlue, getForcedRed, getForcedRedQueen, getForcedBlueQueen, updateCoordinates, searchForced, nestedToStr, makeQueens } from "./utils";

const Board = function Board({redToMove, moveMade, board, setBoard}, ref) {

  
    const [showingMoves, setShowingMoves] = useState(false)
    const [selectedPiece, setSelectedPiece] = useState([])
    const [series, setSeries] = useState(false);
    const [catImage, setCatImage] = useState('');
    const [dogImage, setDogImage] = useState('');
  
    useEffect(() => {
      const fetchCatImage = () => {
        fetch('https://api.thecatapi.com/v1/images/search')
          .then((response) => response.json())
          .then((data) => setCatImage(data[0].url))
          .catch((error) => console.error('Error fetching cat image:', error));
      };
  
      const fetchDogImage = () => {
        fetch('https://dog.ceo/api/breeds/image/random')
          .then((response) => response.json())
          .then((data) => setDogImage(data.message))
          .catch((error) => console.error('Error fetching dog image:', error));
      };
  
      fetchCatImage();
      fetchDogImage();
    }, []);


    const showMoves = (row, col) => {
      
      let selected = board[row][col]
      let possibleMoves = [];

      if (selected === '0' && redToMove){
        let possibleMoves = getMovesRed(board, row, col)
        const forcedMoves = nestedToStr(searchForced(board, "red"))
        if (forcedMoves.length > 0 && possibleMoves.length > 0){
            possibleMoves = possibleMoves.filter(move => forcedMoves.includes(row + ',' + col + ',' + move.toString()))
        }
        setShowingMoves(true)
        setSelectedPiece([row, col])
        return possibleMoves
      }
      
      else if (selected === '1' && !redToMove){
        let possibleMoves = getMovesBlue(board, row, col)
        const forcedMoves = nestedToStr(searchForced(board, "blue"))
        if (forcedMoves.length > 0 && possibleMoves.length > 0){
            possibleMoves = possibleMoves.filter(move => forcedMoves.includes(row + ',' + col + ',' + move.toString()))
        }

        setSelectedPiece([row, col])
        setShowingMoves(true)
        return possibleMoves
      }

      else if(selected === '00' && redToMove){
        let possibleMoves = getMovesRedQueen(board, row, col)
        const forcedMoves = nestedToStr(searchForced(board, "red"))
        if (forcedMoves.length > 0 && possibleMoves.length > 0){
            possibleMoves = possibleMoves.filter(move => forcedMoves.includes(row + ',' + col + ',' + move.toString()))
        }
        setShowingMoves(true)
        setSelectedPiece([row, col])
        return possibleMoves
      }

      else if(selected === '11' && !redToMove){
        let possibleMoves = getMovesBlueQueen(board, row, col)
        const forcedMoves = nestedToStr(searchForced(board, "blue")) 
        if (forcedMoves.length > 0 && possibleMoves.length > 0){
            possibleMoves = possibleMoves.filter(move => forcedMoves.includes(row + ',' + col + ',' + move.toString()))
        }


        setSelectedPiece([row, col])
        setShowingMoves(true)
        return possibleMoves
      }

      else{
        setShowingMoves(false)
        setSelectedPiece([])
        const newBoard = removeHighlights(copyBoard(board))
        setBoard(newBoard)
        return []
      }
    }
  
    const makeMove = (initial, final) => {
      
      if (board[final[0]][final[1]] !== "+" || (final[0] === initial[0] && final[1] === initial[1])){
        setShowingMoves(false)
        setSelectedPiece([])
        const newBoard = copyBoard(board)
        removeHighlights(newBoard)
        setBoard(newBoard)
        if(series){
          setSeries(false)
          moveMade()
          
        }
        return 
      }
      let newBoard = copyBoard(board)

      if(Math.abs(final[0] - initial[0]) === 2){
        mutateTaking(initial, final, newBoard)
        let continuedTakes = []
        if(board[initial[0]][initial[1]] === '0'){
          continuedTakes = getForcedRed(newBoard, final[0], final[1])
          if(continuedTakes.length > 0){
            newBoard[final[0]][final[1]] = board[initial[0]][initial[1]]
            newBoard[initial[0]][initial[1]] = ' '
            removeHighlights(newBoard)
            setBoard(updateCoordinates(newBoard, continuedTakes, '+'))
            setShowingMoves(true)
            setSelectedPiece(final)
            setSeries(true) 
            return
          }
        }
        if(board[initial[0]][initial[1]] === '1'){
          continuedTakes = getForcedBlue(newBoard, final[0], final[1])
          if(continuedTakes.length > 0){
            newBoard[final[0]][final[1]] = board[initial[0]][initial[1]]
            newBoard[initial[0]][initial[1]] = ' '
            removeHighlights(newBoard)
            setBoard(updateCoordinates(newBoard, continuedTakes, '+'))
            setShowingMoves(true)
            setSelectedPiece(final)
            setSeries(true) 
            return
          }
        }
        if(board[initial[0]][initial[1]] === '00'){
          continuedTakes = getForcedRedQueen(newBoard, final[0], final[1])
          if(continuedTakes.length > 0){
            newBoard[final[0]][final[1]] = board[initial[0]][initial[1]]
            newBoard[initial[0]][initial[1]] = ' '
            removeHighlights(newBoard)
            setBoard(updateCoordinates(newBoard, continuedTakes, '+'))
            setShowingMoves(true)
            setSelectedPiece(final)
            setSeries(true) 
            return
          }
        }
        if(board[initial[0]][initial[1]] === '11'){
          continuedTakes = getForcedBlueQueen(newBoard, final[0], final[1])
          if(continuedTakes.length > 0){
            newBoard[final[0]][final[1]] = board[initial[0]][initial[1]]
            newBoard[initial[0]][initial[1]] = ' '
            removeHighlights(newBoard)
            setBoard(updateCoordinates(newBoard, continuedTakes, '+'))
            setShowingMoves(true)
            setSelectedPiece(final)
            setSeries(true) 
            return
          }
        }
      }
      newBoard[final[0]][final[1]] = board[initial[0]][initial[1]]
      newBoard[initial[0]][initial[1]] = ' '
      removeHighlights(newBoard)
      makeQueens(newBoard)
      setBoard(newBoard)
      setShowingMoves(false)
      setSelectedPiece([])
      setSeries(false)
      moveMade()
    }

    const handleClick = (row, col) => {
      if (showingMoves) {
        makeMove(selectedPiece, [row, col])
      } 
      else {
        if (series){
          setShowingMoves(false)
          setSelectedPiece([])
          setSeries(!series)
          moveMade()
        }
        else{
          let possibleMoves = showMoves(row, col)
          let image = '';
        if (board[row][col] === '0') {
          image = dogImage;
        } else if (board[row][col] === '1') {
          image = catImage;
        } else if (board[row][col] === '00') {
          image = dogImage;
        } else if (board[row][col] === '11') {
          image = catImage;
        }
          setBoard(updateCoordinates(copyBoard(board), possibleMoves, '+', image))
        } 
      }
    }
  
    return (
      <>
        {board.map((row, i) => {
          return (
            <div className="board-row" key={'' + i} id={'row-' + i}>
              {row.map((cell, j) => {
                const pieceProps = {
                  color: cell,
                  image: cell === '0' ? dogImage : cell === '1' ? catImage : '',
                };
  
                return (
                  <Square
                    key={'' + i + j}
                    id={'' + i + j}
                    piece={pieceProps}
                    handleClick={() => handleClick(i, j)}
                  ></Square>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };
  export default forwardRef(Board)