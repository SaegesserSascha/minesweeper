import Field from "components/Field/Field";
import React, { useEffect, useState } from "react";
import createBoard from "util/createBoard";
import uuid from "react-uuid";
import "./board.scss";
import revealFields from "util/revealFields";

function Board({ displayWin, displayGameOver}) {
  // TODO Use UI element to select columns and row? Difficulty settings?
  const COLUMNS = 10;
  const ROWS = 10;
  const MINES = 2;
  const SAFEFIELDS = COLUMNS * ROWS - MINES;

  const [boardMatrix, setBoardMatrix] = useState([]);
  const [safeFieldsRemaining, setSafeFieldsRemaining] = useState(COLUMNS * ROWS - MINES);

  useEffect(() => {
    const boardMatrix = createBoard(COLUMNS, ROWS, MINES);
    setBoardMatrix(boardMatrix);
  }, []);

  useEffect(() => {
    if (safeFieldsRemaining <= 0) {
      displayWin();
    }
  }, [safeFieldsRemaining]);

  const revealField = (x, y) => {
    if (boardMatrix[x][y].isFlagged || boardMatrix[x][y].isRevealed) return;
    if (boardMatrix[x][y].value === "X") {
      displayGameOver();
    }

    const boardMatrixCopy = [...boardMatrix];
    const updatedBoardMatrix = revealFields(boardMatrixCopy, x, y, ROWS, COLUMNS);
    updateSafeFieldsRemaining(updatedBoardMatrix);
    setBoardMatrix(updatedBoardMatrix);
  }

  const toggleFlag = (e, x, y) => {
    if (boardMatrix[x][y].isRevealed) return;

    e.preventDefault();
    let boardMatrixCopy = [...boardMatrix];
    boardMatrixCopy[x][y].isFlagged = !boardMatrixCopy[x][y].isFlagged;
    setBoardMatrix(boardMatrixCopy);
  }

  function updateSafeFieldsRemaining(boardMatrix) {
    let fieldsRemaining = SAFEFIELDS;
    boardMatrix.forEach((row) => {
      row.forEach((field) => {
        if (field.isRevealed && field.value !== "X") {
          fieldsRemaining--;
        }
      });
    });
    console.log(fieldsRemaining);
    setSafeFieldsRemaining(fieldsRemaining);
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