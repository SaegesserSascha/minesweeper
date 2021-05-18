import Field from "components/field/Field";
import React, { useEffect, useRef, useState } from "react";
import createBoard from "util/createBoard";
import uuid from "react-uuid";
import "./board.scss";
import revealFields from "util/revealFields";

function Board({ gameIsRunning, gameOverIsVictory, settings, flags, setFlags }) {
  const { columns, rows, mines } = settings;

  const ref = useRef(null);

  const [boardMatrix, setBoardMatrix] = useState([]);
  const [undetectedMinesRemaining, setUndetectedMinesRemaining] = useState(columns * rows);

  useEffect(() => {
    if (gameIsRunning) {
      const boardMatrix = createBoard(settings);
      setBoardMatrix(boardMatrix);
      setFlags(0);
    }
  }, [mines, settings, gameIsRunning, setFlags]);

  useEffect(() => {
    if (undetectedMinesRemaining <= 0 && flags === mines) {
      gameOverIsVictory(true);
    }
  }, [flags, gameOverIsVictory, mines, undetectedMinesRemaining]);

  const revealField = (x, y) => {
    if (boardMatrix[x][y].isFlagged || boardMatrix[x][y].isRevealed) return;
    if (boardMatrix[x][y].value === "X") {
      gameOverIsVictory(false);
    }

    const boardMatrixCopy = [...boardMatrix];
    const updatedBoardMatrix = revealFields(boardMatrixCopy, x, y, rows, columns);
    updateSafeFieldsRemaining(updatedBoardMatrix);
    setBoardMatrix(updatedBoardMatrix);
  }

  const toggleFlag = (e, x, y) => {
    if (boardMatrix[x][y].isRevealed) return;
    if (flags >= mines && !boardMatrix[x][y].isFlagged) return; 

    e.preventDefault();
    let boardMatrixCopy = [...boardMatrix];
    boardMatrixCopy[x][y].isFlagged = !boardMatrixCopy[x][y].isFlagged;
    updateSafeFieldsRemaining(boardMatrixCopy);
    setBoardMatrix(boardMatrixCopy);
  }

  function updateSafeFieldsRemaining(boardMatrix) {
    let undetectedMinesRemaining = columns * rows;
    let flags = 0;

    boardMatrix.forEach((column) => {
      column.forEach((field) => {
        if (field.isRevealed || field.isFlagged) {
          undetectedMinesRemaining--;
        }
        if (field.isFlagged) {
          flags++;
        }
      });
    });

    setFlags(flags);
    setUndetectedMinesRemaining(undetectedMinesRemaining);
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