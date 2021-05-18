import React from "react";
import "./endScreen.scss";
import { VscDebugRestart } from "react-icons/vsc";
import { AiOutlineClockCircle, AiOutlineTrophy } from "react-icons/ai";
import formatTime from "../../util/timeFormatter";

function EndScreen({ isVictory, restart, finalTime, highScore }) {
  const RESTARTICONSIZE = 24;
  const TIMEICONSIZE = 54;

  function displayWin() {
    return (
      <div>
        <div
          className="restart-btn"
          onClick={restart}
        >
          <VscDebugRestart size={RESTARTICONSIZE} />
          <h3>Noch mal spielen?</h3>
        </div>
      </div>
    );
  }

  function displayLose() {
    return (
      <div>
        <div
          className="restart-btn"
          onClick={restart}
        >
          <VscDebugRestart size={RESTARTICONSIZE} />
          <h3>Erneut versuchen?</h3>
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
        {isVictory ? displayWin() : displayLose()}
      </div>
    </div>
  );
}

export default EndScreen;