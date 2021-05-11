import Board from 'components/board/Board';
import BoardSizeContext from 'components/context/BoardSizeContext';
import EndScreen from 'components/endScreen/EndScreen';
import Header from 'components/header/Header';
import { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const MAXFINALTIME = 1000;

  const [gameIsRunning, setGameIsRunning] = useState(true);
  const [isVictory, setIsVictory] = useState(undefined);
  const [finalTime, setFinalTime] = useState(-1);
  const [highScore, setHighScore] = useState(MAXFINALTIME);

  function gameOverIsVictory(isVictory) {
    setIsVictory(isVictory);
    setGameIsRunning(false);
  }

  function updateFinalTime(time) {
    setFinalTime(time);
  }

  function restart() {
    setGameIsRunning(true);
    setIsVictory(undefined);
    setFinalTime(-1);
  }

  useEffect(() => {
    if (isVictory && finalTime < highScore) {
      setHighScore(finalTime);
    }
  }, [finalTime]);

  return (
    <div className="App">
      <BoardSizeContext.Provider value={300}>
        <Header
          gameIsRunning={gameIsRunning}
          isVictory={isVictory}
          updateFinalTime={updateFinalTime}
        />
        <Board
          gameIsRunning={gameIsRunning}
          gameOverIsVictory={gameOverIsVictory}
        />
      </BoardSizeContext.Provider>
      {!gameIsRunning && finalTime >= 0
        ? <EndScreen
          isVictory={isVictory}
          restart={restart}
          finalTime={finalTime}
          highScore={highScore}
        />
        : ""}
    </div>
  );
}

export default App;
