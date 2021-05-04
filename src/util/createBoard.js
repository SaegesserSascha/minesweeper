const createBoard = (ROWS, COLUMNS, MINES) => {
  if (ROWS <= 0 || COLUMNS <= 0) return;

  let boardMatrix = [];

  for (let i = 0; i < ROWS; i++) {
    let column = [];
    for (let j = 0; j < COLUMNS; j++) {
      column.push({
        x: i,
        y: j,
        value: 0,
        neighborMinesCount: 0,
        flagged: false,
        revealed: false
      });
    }
    boardMatrix.push(column);
  }

  if (MINES > 0) {
    let mineCount = 0;
    while (mineCount < MINES) {
      let x = Math.floor(Math.random() * ROWS);
      let y = Math.floor(Math.random() * COLUMNS);

      if (boardMatrix[x][y].value === 0) {
        boardMatrix[x][y].value = "X";
        mineCount++;
      }
    }
  }

  calculateNeighborMinesCount(boardMatrix, ROWS, COLUMNS);

  return boardMatrix;
}

function calculateNeighborMinesCount(boardMatrix, ROWS, COLUMNS) {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      if (boardMatrix[i][j].value === "X") continue;

      // Top
      if (i > 0 && boardMatrix[i - 1][j].value === "X") {
        boardMatrix[i][j].value++;
      }

      // Top-right
      if (i > 0 && j < COLUMNS - 1 && boardMatrix[i - 1][j + 1].value === "X") {
        boardMatrix[i][j].value++;
      }

      // Right
      if (j < COLUMNS - 1 && boardMatrix[i][j + 1].value === "X") {
        boardMatrix[i][j].value++;
      }

      // Bottom-right
      if (i < ROWS - 1 && j < COLUMNS - 1 && boardMatrix[i + 1][j + 1].value === "X") {
        boardMatrix[i][j].value++;
      }

      // Bottom
      if (i < ROWS - 1 && boardMatrix[i + 1][j].value === "X") {
        boardMatrix[i][j].value++;
      }

      // Bottom-left
      if (i < ROWS - 1 && j > 0 && boardMatrix[i + 1][j - 1].value === "X") {
        boardMatrix[i][j].value++;
      }

      // Left
      if (j > 0 && boardMatrix[i][j - 1].value === "X") {
        boardMatrix[i][j].value++;
      }

      // Top-left
      if (i > 0 && j > 0 && boardMatrix[i - 1][j - 1].value === "X") {
        boardMatrix[i][j].value++;
      }
    }
  }
}

export default createBoard;