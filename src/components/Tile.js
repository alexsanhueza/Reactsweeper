import React, { useState, useContext } from 'react';
import { GameContext, globalActions } from '../context';

const Tile = ({ mined, hasMine, coords, position }) => {
  const { dispatch, state } = useContext(GameContext);

  const displayModes = [null, <img src="/flag.png" alt="flagged" />, <b>?</b>];
  const [display, setDisplay] = useState(0);

  const mine = () => {
    if (!mined && !display)
      dispatch({ type: globalActions.MINE_TILE, payload: position });
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
    </div>
  );
};

export default Tile;
