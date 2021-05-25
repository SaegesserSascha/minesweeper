import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import Board from 'components/board/Board';
import EndScreen from 'components/endScreen/EndScreen';
import Header from 'components/header/Header';
import settingValues from "./data/settings";

function App() {
  const MAXFINALTIME = 1000;

  const [gameIsRunning, setGameIsRunning] = useState(true);
  const [isVictory, setIsVictory] = useState(undefined);
  const [shouldEndScreenDisplay, setShouldEndScreenDisplay] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [highScore, setHighScore] = useState(MAXFINALTIME);
  const [settings, setSettings] = useState(settingValues[0]);
  const [flags, setFlags] = useState(0);

  const updateSettings = useCallback((value) => {
    setSettings(settingValues[value]);
  }, []);

  const gameOverIsVictory = useCallback((isVictory) => {
    setIsVictory(isVictory);
    setGameIsRunning(false);
    setTimeout(() => {
      setShouldEndScreenDisplay(true);
    }, 500);
  }, []);

  function updateFinalTime(time) {
    setFinalTime(time);
    if (isVictory && time < highScore) {
      setHighScore(time);
    }
  }

  function restart() {
    setGameIsRunning(true);
    setIsVictory(undefined);
    setShouldEndScreenDisplay(false);
    setFinalTime(-1);
  }

  useEffect(() => {
    setGameIsRunning(false);
    setTimeout(() => {
      restart();
    }, 1);
  }, [settings]);

  return (
    <div className="App">
      <Header
        gameIsRunning={gameIsRunning}
        isVictory={isVictory}
        updateFinalTime={updateFinalTime}
        settings={settings}
        updateSettings={updateSettings}
        flags={flags}
      />
      <Board
        gameIsRunning={gameIsRunning}
        gameOverIsVictory={gameOverIsVictory}
        settings={settings}
        flags={flags}
        setFlags={setFlags}
      />
      {shouldEndScreenDisplay
        && <EndScreen
          isVictory={isVictory}
          restart={restart}
          finalTime={finalTime}
          highScore={highScore}
        />
      }
    </div>
  );
}

export default App;