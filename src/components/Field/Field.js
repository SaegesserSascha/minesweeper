import "./field.scss";
import React from "react";
import { BsFillFlagFill } from "react-icons/bs";
import { FaBomb } from "react-icons/fa";

function Field({ data, revealField, toggleFlag }) {
  function displayData() {
    if (data.value === "X") return <FaBomb />;
    return data.value;
  }

  return (
    <div
      className="field"
      data-isrevealed={data.isRevealed}
      onClick={() => revealField(data.x, data.y)}
      onContextMenu={e => toggleFlag(e, data.x, data.y)}
    >
      <div className="content"
        data-value={data.value}
        data-isflagged={data.isFlagged}
      >
        {data.isFlagged && <BsFillFlagFill />}
        {data.isRevealed && displayData()}
      </div>
    </div>
  );
}

export default Field;