import Field from "components/Field/Field";
import React from "react";
import uuid from "react-uuid";
import "./board.scss";

function Board() {
  // TODO Use UI element to select columns and row? Difficulty settings?
  const COLUMNS = 10;
  const ROWS = 10;

  const boardMatrix =
    new Array(COLUMNS).fill(0).map(() =>
      new Array(ROWS).fill(0));

  return (
    <div id="board">
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