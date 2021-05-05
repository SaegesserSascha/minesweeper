import React from "react";

function EndScreen({ isVictory, restart }) {
  return (
    <div>
      <h1>{isVictory.toString()}</h1>
      <button onClick={restart}>Try again?</button>
    </div>
  );
}

export default EndScreen;