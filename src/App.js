import './App.css';
// import React from 'react';
import { useState, useEffect } from 'react';
import Square from './components/Square';
import { Pattern } from "./Pattern";
function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  useEffect(() => {
    // Here order will matter
    // Always check Tie before Win
    checkTie();
    checkWinner();
    if (player === 'X')
      setPlayer("O");
    else
      setPlayer("X");
  }, [board]);
  useEffect(() => {
    if (result.state !== "none") {
      alert(`Game finished ! Winner is ${result.winner}`);
    }

  }, [result]);
  const chooseSquare = (square) => {
    if (board[square] === "") {
      setBoard(
        board.map((currentValue, index) => {
          if (index === square)
            return player;
          else
            return currentValue;
        })
      )
    }

  };
  const checkWinner = () => {
    Pattern.forEach((curPattern) => {
      const curPlayer = board[curPattern[0]];
      if (curPlayer === "")
        return;
      let isWinner = true;
      curPattern.forEach((index) => {
        if (board[index] !== curPlayer) {
          isWinner = false;
        }
      });
      if (isWinner) {
        setResult({ winner: curPlayer, state: "Win" })
      }
    });
  }
  const checkTie = () => {
    let filled = true;
    board.forEach((curVal) => {
      if (curVal === "")
        filled = false
    })
    if (filled)
      setResult({ winner: "none", state: "Tie" })
  }
  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
    setResult({winner:"none",state:"none"});
  }
  return (
    <div className="App">

      <h1>Welcome to Tic-Tac-Toe!</h1>
      {/* make board for the game */}
      <div className='board'>
        <div className='row'>
          <Square val={board[0]} chooseSquare={() => chooseSquare(0)} />
          <Square val={board[1]} chooseSquare={() => chooseSquare(1)} />
          <Square val={board[2]} chooseSquare={() => chooseSquare(2)} />
        </div>
        <div className='row'>
          <Square val={board[3]} chooseSquare={() => chooseSquare(3)} />
          <Square val={board[4]} chooseSquare={() => chooseSquare(4)} />
          <Square val={board[5]} chooseSquare={() => chooseSquare(5)} />
        </div>
        <div className='row'>
          <Square val={board[6]} chooseSquare={() => chooseSquare(6)} />
          <Square val={board[7]} chooseSquare={() => chooseSquare(7)} />
          <Square val={board[8]} chooseSquare={() => chooseSquare(8)} />
        </div>
      </div>
      <div className='btn-reset'>
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
}

export default App;
