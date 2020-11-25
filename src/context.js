import React, { useReducer, createContext } from 'react';

export const GameContext = createContext();

export const globalActions = {
  INIT_GAME: 'INIT_GAME',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_GAME':
      const { mineNumber, tileNumber } = state;
      const mines = [];
      for (let i = 0; i < mineNumber; i += 1) {
        const position = Math.floor(Math.random() * tileNumber);
        if (!mines.includes(position)) mines.push(position);
      }

      const [rows, columns] = [Math.sqrt(tileNumber), Math.sqrt(tileNumber)];

      const generateTileId = (index) => {
        const row = Math.floor(index / rows);
        const column = index % columns;
        return [row, column];
      };
      const tiles = [];

      for (let i = 0; i < state.tileNumber; i += 1) {
        tiles.push({
          coords: generateTileId(i),
          mined: false,
          display: 0,
          hasMine: !!mines.includes(i),
        });
      }

      return {
        ...state,
        mines,
        tiles,
      };

    default:
      return state;
  }
};

const initialState = {
  difficulty: 'Medium',
  tileNumber: 256,
  tiles: {},
  mineNumber: 40,
  mines: [],
};

export const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
