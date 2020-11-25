import React, { useEffect, useContext } from 'react';
import { GameContext, globalActions } from '../context';

import Tile from './Tile';

const Board = () => {
  const { dispatch, state } = useContext(GameContext);

  useEffect(() => dispatch({ type: globalActions.INIT_GAME }), []);

  const { coords, mined, display, hasMine } = state;
  const tileComponents = [];
  for (let i = 0; i < state.tileNumber; i += 1) {
    tileComponents.push(
      <Tile
        key={i}
        coords={coords}
        mined={mined}
        display={display}
        hasMine={hasMine}
      />
    );
  }

  return (
    <div id="board" className="medium">
      {tileComponents}
    </div>
  );
};

export default Board;
