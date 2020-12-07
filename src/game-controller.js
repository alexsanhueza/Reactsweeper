export const gameController = {
  mineTile(state, action) {
    const position = action.payload;
    const newTiles = [...state.tiles];
    newTiles[position].mined = true;

    const surroundingsCheck = (coords) => {
      const q = [];

      for (let i = -1; i < 2; i += 1) {
        for (let j = -1; j < 2; j += 1) {
          const positionDiff = i * 16 + j;
          if (i || j)
            q.push({ coords: [coords[0] + i, coords[1] + j], positionDiff });
        }
      }
      return q;
    };

    //Check all surrounding tiles
    //if no adjacent mines, recurse
    //if adjacent mines, assign number based on how many adjacent mines, and update number
    const mineSweep = (pos) => {
      const tile = newTiles[position];

      if (tile.hasMine) return true;

      const check = surroundingsCheck(tile.coords);

      for (let { coords, positiondiff } of check) {
        if (
          coords[0] > -1 &&
          coords[1] > -1 &&
          coords[0] < 16 &&
          coords[1] < 16
        )
          if (mineSweep(pos + positiondiff)) tile.adjacentMines += 1;
      }
    };

    return newTiles;
  },
};
