import neighborDeltas from "./neighborDeltas";

function revealFields(boardMatrix, x, y, settings) {
  if (!boardMatrix[x][y].isRevealed) {
    boardMatrix[x][y].isRevealed = true;
    boardMatrix[x][y].isFlagged = false;
  }

  if (boardMatrix[x][y].value === "X" || boardMatrix[x][y].value > 0) {
    return boardMatrix;
  }

  const coordinatesToReveal =
    neighborDeltas.map(delta => {
      return checkNeighbor(boardMatrix, x + delta.x, y + delta.y, settings);
    }).filter(value =>
      value !== undefined);

  coordinatesToReveal.forEach(neighbor => {
    revealFields(boardMatrix, neighbor.x, neighbor.y, settings);
  });

  return boardMatrix;
}

function checkNeighbor(boardMatrix, x, y, { columns, rows }) {
  if (x < 0 || x > columns - 1 || y < 0 || y > rows - 1) return;
  if (boardMatrix[x][y].isRevealed) return;

  return { x, y };
}

export default revealFields;