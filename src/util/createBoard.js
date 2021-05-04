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
        isFlagged: false,
        isRevealed: false
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
  const neighborDeltas = [
    [-1, +0],
    [-1, +1],
    [+0, +1],
    [+1, +1],
    [+1, +0],
    [+1, -1],
    [+0, -1],
    [-1, -1]
  ];

  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLUMNS; y++) {
      if (boardMatrix[x][y].value === "X") continue;

      neighborDeltas.forEach(delta => {
        if (checkNeighbor(boardMatrix, x + delta[0], y + delta[1], ROWS, COLUMNS)) {
          boardMatrix[x][y].value++;
        }
      });
    }
  }
}

function checkNeighbor(boardMatrix, x, y, ROWS, COLUMNS) {
  if (x < 0 || x > ROWS - 1 || y < 0 || y > COLUMNS - 1) return;

  if (boardMatrix[x][y].value === "X") return true;
}

export default createBoard;