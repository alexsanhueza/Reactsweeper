const surroundingsGen = (pos, tiles) => {
  const surroundings = [];
  const col = Math.sqrt(tiles.length);

  const start = pos % col === 0 ? 0 : -1;
  const end = pos % col === col - 1 ? 1 : 2;

  for (let i = -1; i < 2; i += 1) {
    for (let j = start; j < end; j += 1) {
      const posToAdd = pos + col * i + j;
      if (posToAdd >= 0 && posToAdd < tiles.length && posToAdd !== pos)
        surroundings.push(posToAdd);
    }
  }
  return surroundings;
};

export const gameController = {
  assignAdjacentMines(tiles) {
    //loop through tiles, if has mine, then increment adacent mines for each surrounding mine
    tiles.forEach((tile) => {
      if (tile.hasMine) {
        const tilesToIncrement = surroundingsGen(tile.position, tiles);

        tilesToIncrement.forEach((pos) => (tiles[pos].adjacentMines += 1));
      }
    });
  },

  mineTile(position, tiles) {
    if (tiles[position].mined) return;
    tiles[position].mined = true;
    //use surroundings gen to get list of surrounding tiles
    const toCheck = surroundingsGen(position, tiles);
    if (toCheck.some((pos) => tiles[pos].hasMine)) return;
    //for each tile
    toCheck.forEach((pos) => {
      this.mineTile(pos, tiles);
    });
  },

  markTile(state, position) {
    const tiles = [...state.tiles];
    const tile = { ...tiles[position] };
    const isFlagged = tile.displayIdx === 1;
    const willBeFlagged = tile.displayIdx === 0;
    let remainingMines = state.remainingMines;
    let remainingFlags = state.remainingFlags;

    if (isFlagged) {
      tile.displayIdx = 2;
      remainingFlags += 1;
      if (tile.hasMine) {
        remainingMines += 1;
      }
    } else if (willBeFlagged && remainingFlags) {
      tile.displayIdx = 1;
      remainingFlags -= 1;
      if (tile.hasMine) {
        remainingMines -= 1;
      }
    } else {
      tile.displayIdx = 0;
    }

    tiles[position] = tile;

    const isGameWon = remainingMines === 0;

    return { tiles, remainingMines, remainingFlags, isGameWon };
  },
};
