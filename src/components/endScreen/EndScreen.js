import React from "react";

function EndScreen({ isVictory }) {
  return (
    <div>
      <h1>{isVictory.toString()}</h1>
    </div>
  );
}

export default EndScreen;