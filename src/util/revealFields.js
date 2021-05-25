import neighborDeltas from "./neighborDeltas";

function revealFields(boardMatrix, x, y, COLUMNS, ROWS) {
  if (!boardMatrix[x][y].isRevealed) {
    boardMatrix[x][y].isRevealed = true;
    boardMatrix[x][y].isFlagged = false;
  }

  if (boardMatrix[x][y].value === "X" || boardMatrix[x][y].value > 0) {
    return boardMatrix;
  }

  const coordinateOfNeighborToReveal =
    neighborDeltas.map(delta => {
      return checkNeighbor(boardMatrix, x + delta.x, y + delta.y, ROWS, COLUMNS);
    }).filter(value =>
      value !== undefined);

  coordinateOfNeighborToReveal.forEach(neighbor => {
    revealFields(boardMatrix, neighbor.x, neighbor.y, COLUMNS, ROWS);
  });

  return boardMatrix;
}

function checkNeighbor(boardMatrix, x, y, COLUMNS, ROWS) {
  if (x < 0 || x > COLUMNS - 1 || y < 0 || y > ROWS - 1) return;
  if (boardMatrix[x][y].isRevealed) return;

  return { x, y };
}

export default revealFields;