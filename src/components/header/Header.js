import BoardSizeContext from "components/context/BoardSizeContext";
import React, { useContext, useEffect, useState } from "react";
import "./header.scss";
import { AiOutlineClockCircle } from "react-icons/ai";

function Header({ gameIsRunning, isVictory, updateFinalTime }) {
  const [clock, setClock] = useState(0);

  const width = useContext(BoardSizeContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(clock => clock + 1);
    }, 1000);

    if (isVictory !== undefined) {
      clearInterval(timer);
      updateFinalTime(clock);
    }

    return () => clearInterval(timer);
  }, [isVictory]);

  useEffect(() => {
    if (!gameIsRunning) {
      setClock(0);
    }
  }, [gameIsRunning]);

  return (
    <div className="header" style={{ width: width }}>
      <div className="timer">
        <AiOutlineClockCircle size={30} />
        <h3>{clock}</h3>
      </div>
    </div>
  );
}

export default Header;