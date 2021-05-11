import Field from "components/field/Field";
import React, { useEffect, useRef, useState } from "react";
import createBoard from "util/createBoard";
import uuid from "react-uuid";
import "./board.scss";
import revealFields from "util/revealFields";

function Board({ gameIsRunning, gameOverIsVictory }) {
  // TODO Use UI element to select columns and row? Difficulty settings?
  const COLUMNS = 10;
  const ROWS = 10;
  const MINES = 3;
  const SAFEFIELDS = COLUMNS * ROWS - MINES;

  const ref = useRef(null);

  const [boardMatrix, setBoardMatrix] = useState([]);
  const [safeFieldsRemaining, setSafeFieldsRemaining] = useState(COLUMNS * ROWS - MINES);

  useEffect(() => {
    if (gameIsRunning) {
      const boardMatrix = createBoard(COLUMNS, ROWS, MINES);
      setBoardMatrix(boardMatrix);
      setSafeFieldsRemaining(COLUMNS * ROWS - MINES);
    }
  }, [gameIsRunning]);

  useEffect(() => {
    if (safeFieldsRemaining <= 0) {
      gameOverIsVictory(true);
    }
  }, [safeFieldsRemaining]);

  const revealField = (x, y) => {
    if (boardMatrix[x][y].isFlagged || boardMatrix[x][y].isRevealed) return;
    if (boardMatrix[x][y].value === "X") {
      gameOverIsVictory(false);
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
    boardMatrix.forEach((column) => {
      column.forEach((field) => {
        if (field.isRevealed && field.value !== "X") {
          fieldsRemaining--;
        }
      });
    });
    setSafeFieldsRemaining(fieldsRemaining);
  }

  const board = boardMatrix.map((column, index) => {
    return (
      <div
        key={uuid()}
        className={(index % 2 === 0) ? `column-even` : `column-odd`}
      >
        {
          column.map(field => {
            return (
              <Field
                key={uuid()}
                data={field}
                toggleFlag={toggleFlag}
                revealField={revealField}
              />
            );
          })
        }
      </div >
    );
  });

  return (
    <div
      id="board"
      ref={ref}
      onContextMenu={(e) => e.preventDefault()}
    >
      {board}
    </div>
  );
}

export default Board;