import Board from 'components/board/Board';
import EndScreen from 'components/endScreen/EndScreen';
import Header from 'components/header/Header';
import { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [isVictory, setIsVictory] = useState(undefined);
  const [clock, setClock] = useState(0);

  function gameOverIsVictory(isVictory) {
    setIsVictory(isVictory);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(clock => clock + 1);
    }, 1000);

    if (isVictory !== undefined) {
      clearInterval(timer);
    };

    return () => clearInterval(timer);
  }, [isVictory]);

  return (
    <div className="App">
      <Header clock={clock} />
      <Board
        gameOverIsVictory={gameOverIsVictory}
      />
      {isVictory !== undefined ? <EndScreen isVictory={isVictory} /> : ""}
    </div>
  );
}

export default App;
