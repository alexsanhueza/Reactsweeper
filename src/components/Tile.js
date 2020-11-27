import React, { useState, useContext } from 'react';
import { GameContext, globalActions } from '../context';

const Tile = ({ mined, hasMine, coords, position, adjacentMines }) => {
  const { dispatch, state } = useContext(GameContext);

  const displayModes = [null, <img src="/flag.png" alt="flagged" />, <b>?</b>];
  const [display, setDisplay] = useState(0);

  const mine = () => {
    if (mined || display) return;

    if (!hasMine)
      dispatch({ type: globalActions.MINE_TILE, payload: position });
    else if (hasMine) dispatch({ type: globalActions.BLOW_UP });
  };

  const toggleMarkup = (e) => {
    e.preventDefault();
    if (!mined) setDisplay((display) => (display + 1) % 3);
  };

  const minedClass = !mined ? 'unmined' : 'mined';

  return (
    <div
      className={`tile ${minedClass}`}
      onClick={mine}
      onContextMenu={toggleMarkup}
    >
      {displayModes[display]}
      {state.gameOver && hasMine && <b>.</b>}
      {adjacentMines && adjacentMines}
    </div>
  );
};

export default Tile;
