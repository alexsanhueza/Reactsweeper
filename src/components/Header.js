import React, { useContext } from 'react';
import GameContext, { globalActions } from '../context';

const Header = () => {
  const { dispatch, state } = useContext(GameContext);

  const smiley = state.gameOver ? `:'(` : ':D';

  return (
    <div id="header">
      <p>Difficulty: Medium</p>
      <p>{smiley}</p>
      {state.gameOver && (
        <button onClick={() => dispatch({ type: globalActions.INIT_GAME })}>
          New Game
        </button>
      )}
      <p>Minesweeper</p>
    </div>
  );
};

export default Header;
