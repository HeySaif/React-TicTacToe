// src/TicTacToe.jsx
import { useState, useEffect } from 'react';
import './TicTacToe.css';

// 1. Reusable Square Component for individual grid cells
function Square({ value, onClick }) {
  return (
    <button className={`square ${value}`} onClick={onClick}>
      {value}
    </button>
  );
}

export default function TicTacToe() {
  // Array of 9 items representing the 3x3 board grid slots
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState('');

  // 2. Core winning pattern combinations (Rows, Columns, Diagonals)
  const winningPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  function getWinner(squaresArray) {
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      // Check if first index has a value, and matches the other two indices
      if (squaresArray[a] && squaresArray[a] === squaresArray[b] && squaresArray[a] === squaresArray[c]) {
        return squaresArray[a]; // Returns 'X' or 'O'
      }
    }
    return null;
  }

  // 3. Handle a box click selection
  function handleSquareClick(getCurrentIndex) {
    let copySquares = [...squares];

    // Guard Clause: Block click if a winner exists or if square is already filled
    if (getWinner(copySquares) || copySquares[getCurrentIndex]) return;

    // Fill square based on current turn value
    copySquares[getCurrentIndex] = isXTurn ? 'X' : 'O';
    
    setSquares(copySquares);
    setIsXTurn(!isXTurn); // Invert turn flag
  }

  // 4. Track game state changes to dynamically update status messages
  useEffect(() => {
    const winner = getWinner(squares);
    const isDraw = squares.every((item) => item !== '');

    if (winner) {
      setStatus(`Winner is ${winner}! 🎉`);
    } else if (isDraw) {
      setStatus(`It's a draw! Reset to try again.`);
    } else {
      setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`);
    }
  }, [squares, isXTurn]);

  // 5. Reset states back to initial configuration
  function handleRestart() {
    setSquares(Array(9).fill(''));
    setIsXTurn(true);
  }

  return (
    <div className="tic-tac-toe-container">
      {/* 3x3 Grid Layout */}
      <div className="board-grid">
        <div className="row">
          <Square value={squares[0]} onClick={() => handleSquareClick(0)} />
          <Square value={squares[1]} onClick={() => handleSquareClick(1)} />
          <Square value={squares[2]} onClick={() => handleSquareClick(2)} />
        </div>
        <div className="row">
          <Square value={squares[3]} onClick={() => handleSquareClick(3)} />
          <Square value={squares[4]} onClick={() => handleSquareClick(4)} />
          <Square value={squares[5]} onClick={() => handleSquareClick(5)} />
        </div>
        <div className="row">
          <Square value={squares[6]} onClick={() => handleSquareClick(6)} />
          <Square value={squares[7]} onClick={() => handleSquareClick(7)} />
          <Square value={squares[8]} onClick={() => handleSquareClick(8)} />
        </div>
      </div>

      {/* Dynamic Status Display Message */}
      <h2 className="status-text">{status}</h2>

      <button className="btn-restart" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}