import React from "react";
import "./field.scss";

function Field({ data, revealField, toggleFlag }) {
  return (
    <div
      className="field"
      onClick={() => revealField(data.x, data.y)}
      onContextMenu={e => toggleFlag(e, data.x, data.y)}
    >
      { data.isRevealed ? data.value : ""}
      { data.isFlagged ? "F" : ""}
    </div>
  );
}

export default Field;