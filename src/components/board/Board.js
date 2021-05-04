import Field from "components/Field/Field";
import React, { useEffect, useState } from "react";
import createBoard from "util/createBoard";
import uuid from "react-uuid";
import "./board.scss";
import revealFields from "util/revealFields";

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

  const revealField = (x, y) => {
    if (boardMatrix[x][y].isFlagged) return;

    const boardMatrixCopy = [...boardMatrix];
    const updatedBoardMatrix = revealFields(boardMatrixCopy, x, y, ROWS, COLUMNS);
    setBoardMatrix(updatedBoardMatrix);
  }

  const toggleFlag = (e, x, y) => {
    if (boardMatrix[x][y].isRevealed) return;

    e.preventDefault();
    let boardMatrixCopy = [...boardMatrix];
    boardMatrixCopy[x][y].isFlagged = !boardMatrixCopy[x][y].isFlagged;
    setBoardMatrix(boardMatrixCopy);
  }

  const board = boardMatrix.map(row => {
    return (
      <div key={uuid()} className="row">
        {row.map(field => {
          return (
            <Field
              key={uuid()}
              data={field}
              toggleFlag={toggleFlag}
              revealField={revealField}
            />
          );
        })}
      </div>
    );
  });

  return (
    <div
      id="board"
      onContextMenu={(e) => e.preventDefault()}
    >
      {board}
    </div>
  );
}

export default Board;