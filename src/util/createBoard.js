import neighborDeltas from "./neighborDeltas";

const createBoard = (settings) => {
  if (settings.columns <= 0 || settings.rows <= 0) return;

  let boardMatrix = [];

  createEmptyBoard(boardMatrix, settings);
  generateMines(boardMatrix, settings);
  calculateNeighborMinesCount(boardMatrix, settings);

  return boardMatrix;
}

function createEmptyBoard(boardMatrix, { columns, rows }) {
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
}

function generateMines(boardMatrix, { columns, rows, mines }) {
  if (mines <= 0 || mines >= columns * rows) return;

  let generatedMines = 0;

  while (generatedMines < mines) {
    let x = Math.floor(Math.random() * columns);
    let y = Math.floor(Math.random() * rows);

    if (boardMatrix[x][y].value === 0) {
      boardMatrix[x][y].value = "X";
      generatedMines++;
    }
  }
}

function calculateNeighborMinesCount(boardMatrix, { columns, rows }) {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      if (boardMatrix[x][y].value === "X") continue;

      neighborDeltas.forEach(delta => {
        if (isNeighborMine(boardMatrix, x + delta.x, y + delta.y, columns, rows)) {
          boardMatrix[x][y].value++;
        }
      });
    }
  }
}

function isNeighborMine(boardMatrix, x, y, columns, rows) {
  if (x < 0 || x > columns - 1 || y < 0 || y > rows - 1) return;

  if (boardMatrix[x][y].value === "X") return true;
}

export default createBoard;