import { useState } from "react";
import TicTacToe from "./components/TicTacToe";

function App() {
  const [degree, setDegree] = useState(3);
  return (
    <TicTacToe degree={degree} />
  );
}

export default App;
