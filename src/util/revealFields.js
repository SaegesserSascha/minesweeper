const revealFields = (boardMatrix, x, y, ROWS, COLUMNS) => {
  boardMatrix[x][y].isRevealed = true;
  boardMatrix[x][y].isFlagged = false;

  if (boardMatrix[x][y].value === "X" || boardMatrix[x][y].value > 0) {
    return boardMatrix;
  }

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

  const coordinateOfNeighborToReveal =
    neighborDeltas.map(delta => {
      return checkNeighbor(boardMatrix, x + delta[0], y + delta[1], ROWS, COLUMNS);
    }).filter(value =>
      value !== undefined);

  coordinateOfNeighborToReveal.forEach(neighbor => {
    revealFields(boardMatrix, neighbor.x, neighbor.y, ROWS, COLUMNS);
  });

  return boardMatrix;
}

function checkNeighbor(boardMatrix, x, y, ROWS, COLUMNS) {
  if (x < 0 || x > ROWS - 1 || y < 0 || y > COLUMNS - 1) return;
  if (boardMatrix[x][y].isRevealed) return;

  return { x, y };
}

export default revealFields;