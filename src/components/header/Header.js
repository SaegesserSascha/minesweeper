import React, { useEffect, useState } from "react";
import "./header.scss";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillFlagFill } from "react-icons/bs";
import Settings from "components/settings/Settings";
import formatTime from "../../util/timeFormatter";

function Header({ gameIsRunning, isVictory, updateFinalTime, settings, updateSettings, flags }) {
  const FIELDSIZE = 30; // in px

  const [clock, setClock] = useState(0);
  const width = settings.columns * FIELDSIZE;

  useEffect(() => {
    let timer;

    const startTimer = () => {
      timer = setInterval(() => {
        setClock(clock => clock + 1);
      }, 1000);
    }

    startTimer();

    if (isVictory !== undefined) {
      clearInterval(timer);
      updateFinalTime(clock);

      if (gameIsRunning) {
        startTimer();
      }
    }

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVictory]);

  useEffect(() => {
    if (!gameIsRunning) {
      setClock(0);
    }
  }, [gameIsRunning]);

  return (
    <div className="header" style={{ width: width }}>
      <Settings updateSettings={updateSettings} />
      <div className="undetected-mines-remaining">
        <BsFillFlagFill size={30} />
        <h3>{settings.mines - flags}</h3>
      </div>
      <div className="timer">
        <AiOutlineClockCircle size={30} />
        <h3>{formatTime(clock)}</h3>
      </div>
    </div>
  );
}

export default Header;