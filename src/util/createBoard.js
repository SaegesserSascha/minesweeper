import {neighborDeltas} from "./neighborDeltas";

const createBoard = ({ columns, rows, mines }) => {
  if (columns <= 0 || rows <= 0) return;

  let boardMatrix = [];

  for (let i = 0; i < columns; i++) {
    let column = [];
    for (let j = 0; j < rows; j++) {
      column.push({
        x: i,
        y: j,
        value: 0,
        isFlagged: false,
        isRevealed: false
      });
    }
    boardMatrix.push(column);
  }

  if (mines > 0) {
    let mineCount = 0;
    while (mineCount < mines) {
      let x = Math.floor(Math.random() * columns);
      let y = Math.floor(Math.random() * rows);

      if (boardMatrix[x][y].value === 0) {
        boardMatrix[x][y].value = "X";
        mineCount++;
      }
    }
  }

  calculateNeighborminesCount(boardMatrix, columns, rows);

  return boardMatrix;
}

function calculateNeighborminesCount(boardMatrix, columns, rows) {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      if (boardMatrix[x][y].value === "X") continue;

      neighborDeltas.forEach(delta => {
        if (checkNeighbor(boardMatrix, x + delta[0], y + delta[1], columns, rows)) {
          boardMatrix[x][y].value++;
        }
      });
    }
  }
}

function checkNeighbor(boardMatrix, x, y, columns, rows) {
  if (x < 0 || x > columns - 1 || y < 0 || y > rows - 1) return;

  if (boardMatrix[x][y].value === "X") return true;
}

export default createBoard;