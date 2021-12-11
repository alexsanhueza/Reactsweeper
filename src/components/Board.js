import React, { useEffect, useContext } from 'react';
import { GameContext, globalActions } from '../context';

import Tile from './Tile';

const Board = () => {
  const { dispatch, state } = useContext(GameContext);

  useEffect(
    () => dispatch({ type: globalActions.INIT_GAME }),
    [state.difficulty]
  );

  const tileComponents = [];
  if (state.tiles.length) {
    for (let i = 0; i < state.tileNumber; i += 1) {
      const { mined, hasMine, adjacentMines, displayIdx } = state.tiles[i];
      tileComponents.push(
        <Tile
          key={i}
          position={i}
          mined={mined}
          hasMine={hasMine}
          adjacentMines={adjacentMines}
          displayIdx={displayIdx}
        />
      );
    }
  }

  return (
    <div id="board" className={state.difficulty.toLowerCase()}>
      {tileComponents}
    </div>
  );
};

export default Board;
