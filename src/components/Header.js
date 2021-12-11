import React, { useContext } from 'react';
import GameContext, { globalActions } from '../context';

const Header = () => {
  const { dispatch, state } = useContext(GameContext);

  const smiley = state.gameOver ? `:'(` : ':D';

  console.log(state.remainingMines);

  return (
    <div id="header">
      <p>Mines Remaining: {state.remainingMines}</p>
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
