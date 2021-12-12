import React, { useContext } from 'react';
import GameContext, { globalActions } from '../context';

const Header = () => {
  const { dispatch, state } = useContext(GameContext);

  let smiley = '🙂';
  if (state.gameOver && !state.remainingMines) smiley = '😎';
  else if (state.gameOver) smiley = '😢';

  return (
    <div id="header">
      <p>Flags: {state.remainingFlags}</p>
      <div id="status">
        <p>{smiley}</p>
        {state.gameOver && (
          <button onClick={() => dispatch({ type: globalActions.INIT_GAME })}>
            New Game
          </button>
        )}
      </div>
      <div id="difficultySelect">
        <label htmlFor="difficulty">Difficulty: </label>
        <select
          id="difficulty"
          value={state.difficulty}
          onChange={(e) =>
            dispatch({
              type: globalActions.CHANGE_DIFFICULTY,
              payload: e.target.value,
            })
          }
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
