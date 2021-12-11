import React, { useContext } from 'react';
import { GameContext, globalActions } from '../context';

const Tile = ({ mined, hasMine, position, adjacentMines, displayIdx }) => {
  const { dispatch, state } = useContext(GameContext);

  const displayModes = [null, <b>?</b>, <img src="/flag.png" alt="flagged" />];

  const mineTile = () => {
    if (mined || displayIdx > 0) return;

    if (!hasMine && !state.gameOver)
      dispatch({ type: globalActions.MINE_TILE, payload: position });
    else if (hasMine) dispatch({ type: globalActions.BLOW_UP });
  };

  const flagTile = (e) => {
    e.preventDefault();
    if (!mined) {
      dispatch({ type: globalActions.MARK_TILE, payload: position });
    }
  };

  const minedClass = !mined ? 'unmined' : 'mined';

  return (
    <div
      className={`tile ${minedClass}`}
      onClick={mineTile}
      onContextMenu={flagTile}
    >
      {!mined && displayModes[displayIdx]}
      {state.gameOver && hasMine && (
        <img src="/mine.png" height="12px" alt="mine" />
      )}
      {adjacentMines > 0 && mined && adjacentMines}
    </div>
  );
};

export default Tile;
