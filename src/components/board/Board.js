import Field from "components/Field/Field";
import React, { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import createBoard from "util/createBoard";
import "./board.scss";

function Board() {
  // TODO Use UI element to select columns and row? Difficulty settings?
  const COLUMNS = 10;
  const ROWS = 10;
  const MINES = 10;

  const [boardMatrix, setBoardMatrix] = useState([]);

  useEffect(() => {
    const boardMatrix = createBoard(COLUMNS, ROWS, MINES);
    setBoardMatrix(boardMatrix);
  }, []);

  // const fields = boardMatrix.map((column) => {
  //   return (
  //     <ul key={uuid()}>
  //       {column.map(() => {
  //         return <Field key={uuid()} />;
  //       })}
  //     </ul>
  //   );
  // })

  return (
    <div
      id="board"
      onContextMenu={(e) => e.preventDefault()}
    >
    </div>
  );
}

export default Board;