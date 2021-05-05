import Board from 'components/board/Board';
import { useState } from 'react';
import './App.scss';

function App() {
  const [victory, setVictory] = useState(false);
  const [defeat, setDefeat] = useState(false);

  function displayWin() {
    setVictory(true);
    console.log("You Win! PogChamp");
  }

  function displayGameOver() {
    setDefeat(true);
    console.log("You lost! sadge");
  }

  return (
    <div className="App">
      <Board
        displayWin={displayWin}
        displayGameOver={displayGameOver}
      />
    </div>
  );
}

export default App;
