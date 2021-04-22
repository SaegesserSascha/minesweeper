import Field from "components/Field/Field";
import React, { useRef } from "react";
import uuid from "react-uuid";
import "./board.scss";

function Board() {
  // TODO Use UI element to select columns and row? Difficulty settings?
  const COLUMNS = 10;
  const ROWS = 10;

  const boardRef = useRef(null);

  const boardMatrix =
    new Array(COLUMNS).fill(0).map(() =>
      new Array(ROWS).fill(0));

  return (
    <div
      id="board"
      ref={boardRef}
      onContextMenu={(e) => e.preventDefault()}
    >
      {boardMatrix.map((column) => {
        return (
          <ul key={uuid()}>
            {column.map(() => {
              return <Field key={uuid()} />;
            })}
          </ul>
        );
      })}
    </div>
  );
}

export default Board;