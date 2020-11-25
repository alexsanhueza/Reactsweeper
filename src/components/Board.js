import React, { useEffect, useContext } from 'react';
import { GameContext, globalActions } from '../context';

import Tile from './Tile';

const Board = () => {
  const { dispatch, state } = useContext(GameContext);

  useEffect(() => dispatch({ type: globalActions.INIT_GAME }), []);

  const tileComponents = [];
  if (state.tiles.length) {
    for (let i = 0; i < state.tileNumber; i += 1) {
      const { coords, mined, display, hasMine } = state.tiles[i];
      tileComponents.push(
        <Tile
          key={i}
          position={i}
          coords={coords}
          mined={mined}
          hasMine={hasMine}
        />
      );
    }
  }

  return (
    <div id="board" className="medium">
      {tileComponents}
    </div>
  );
};

export default Board;
