import "./endScreen.scss";
import React from "react";
import { AiOutlineClockCircle, AiOutlineTrophy } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import formatTime from "util/timeFormatter";

function EndScreen({ isVictory, restart, finalTime, highScore }) {
  const RESTARTICONSIZE = 24;
  const TIMEICONSIZE = 54;

  function displayRestartButton(isVictory) {
    return (
      <div>
        <div
          className="restart-btn"
          onClick={restart}
        >
          <VscDebugRestart size={RESTARTICONSIZE} />
          {isVictory
            ? <h3>Noch mal spielen?</h3>
            : <h3>Erneut versuchen?</h3>
          }
        </div>
      </div>
    );
  }

  return (
    <div className="endscreen-modal-wrapper">
      <div className="endscreen-modal">
        <div className="time-wrapper">
          <div className="final-time-wrapper">
            <AiOutlineClockCircle size={TIMEICONSIZE} />
            <h1>{isVictory ? formatTime(finalTime) : "---"}</h1>
          </div>
          <div className="highscore-time-wrapper">
            <AiOutlineTrophy size={TIMEICONSIZE} />
            <h1>{highScore < 1000 ? formatTime(highScore) : "---"}</h1>
          </div>
        </div>
        {isVictory !== undefined && displayRestartButton(isVictory)}
      </div>
    </div>
  );
}

export default EndScreen;