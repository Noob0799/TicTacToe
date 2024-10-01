function Board({
  board,
  setBoard,
  isXTurn,
  setIsXTurn,
  degree,
  checkForWin,
  incrementMoves,
  gameState,
}) {
  const handleClick = (index) => {
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setBoard(newBoard);
    incrementMoves();
    checkForWin(newBoard, index);
  };

  return (
    <div className="tictactoe-board" style={{ "--degree": degree }}>
      {board.map((char, index) => (
        <button
          key={index}
          className="tictactoe-cell"
          disabled={(char || gameState === "Win") ? true : false}
          onClick={() => handleClick(index)}
        >
          {char ? char : ""}
        </button>
      ))}
    </div>
  );
}

export default Board;
