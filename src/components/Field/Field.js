import React, { useState } from "react";
import "./field.scss";

function Field() {
  const [isBomb, setIsBomb] = useState(false);
  const [neighborBombsCount, setNeighborBombsCount] = useState(0);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    switch (e.button) {
      case 0:
        revealField();
        break;
      case 2:
        toggleFlag();
        break;
      default:
        break;
    }
  }

  function revealField() {
    if (isRevealed) return;
    setIsRevealed(true);
  }

  function toggleFlag() {
    setIsFlagged(currentValue => !currentValue);
  }

  return (
    <li
      className="field"
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {isFlagged.toString()}<br />
      {isRevealed.toString()}
    </li>
  );
}

export default Field;