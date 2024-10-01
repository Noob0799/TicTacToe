import { useState } from "react";
import Board from "./Board";

function TicTacToe({ degree }) {
  const initialBoard = () => Array(degree * degree).fill(null);
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameState, setGameState] = useState("Ongoing");
  const [moves, setMoves] = useState(0);
  const [board, setBoard] = useState(initialBoard);

  const checkForWinUtil = (newBoard, x, y, prevMove, direction) => {
    const index = x * degree + y;
    if (x < 0 || x >= degree || y < 0 || y >= degree) return 0;
    if (!newBoard[index] || newBoard[index] != prevMove) return 0;
    switch (direction) {
      case "topColumn":
        y = y - 1;
        break;
      case "bottomColumn":
        y = y + 1;
        break;
      case "leftRow":
        x = x - 1;
        break;
      case "rightRow":
        x = x + 1;
        break;
      case "topLeft":
        x = x - 1;
        y = y - 1;
        break;
      case "bottomRight":
        x = x + 1;
        y = y + 1;
        break;
      case "topRight":
        x = x + 1;
        y = y - 1;
        break;
      case "bottomLeft":
      default:
        x = x - 1;
        y = y + 1;
        break;
    }
    return 1 + checkForWinUtil(newBoard, x, y, prevMove, direction);
  };

  const checkForWin = (newBoard, index) => {
    const x = Math.floor(index / degree);
    const y = index % degree;
    let isVictory = false;
    let count = 1;
    count += checkForWinUtil(newBoard, x, y - 1, newBoard[index], "topColumn");
    count += checkForWinUtil(
      newBoard,
      x,
      y + 1,
      newBoard[index],
      "bottomColumn"
    );
    if (count == degree) {
      isVictory = true;
    } else {
      count = 1;
      count += checkForWinUtil(newBoard, x - 1, y, newBoard[index], "leftRow");
      count += checkForWinUtil(newBoard, x + 1, y, newBoard[index], "rightRow");
      if (count == degree) {
        isVictory = true;
      } else {
        count = 1;
        count += checkForWinUtil(
          newBoard,
          x - 1,
          y - 1,
          newBoard[index],
          "topLeft"
        );
        count += checkForWinUtil(
          newBoard,
          x + 1,
          y + 1,
          newBoard[index],
          "bottomRight"
        );
        if (count == degree) {
          isVictory = true;
        } else {
          count = 1;
          count += checkForWinUtil(
            newBoard,
            x + 1,
            y - 1,
            newBoard[index],
            "topRight"
          );
          count += checkForWinUtil(
            newBoard,
            x - 1,
            y + 1,
            newBoard[index],
            "bottomLeft"
          );
          if (count == degree) isVictory = true;
        }
      }
    }
    if (isVictory) {
      setGameState("Win");
    } else {
      console.log(moves, degree * degree);
      if (moves + 1 == degree * degree) {
        setGameState("Draw");
      } else {
        setGameState("Ongoing");
      }
    }
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
    setGameState("Ongoing");
    setMoves(0);
  };

  const incrementMoves = () => {
    setMoves(moves + 1);
  };

  return (
    <div className="tictactoe-container">
      <div className="tictactoe-header">
        <span className="title">
          {gameState === "Ongoing"
            ? `Player ${isXTurn ? "X" : "O"}'s Turn`
            : gameState === "Draw"
            ? "It's a Draw"
            : `${isXTurn ? "O" : "X"} Won`}
        </span>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <Board
        board={board}
        setBoard={setBoard}
        isXTurn={isXTurn}
        setIsXTurn={setIsXTurn}
        degree={degree}
        checkForWin={checkForWin}
        incrementMoves={incrementMoves}
        gameState={gameState}
      />
    </div>
  );
}

export default TicTacToe;
