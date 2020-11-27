import React, { useReducer, createContext } from 'react';
import { gameController } from './game-controller';

export const GameContext = createContext();

export const globalActions = {
  INIT_GAME: 'INIT_GAME',
  MINE_TILE: 'MINE_TILE',
  BLOW_UP: 'BLOW_UP',
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

      const generateCoords = (index) => {
        const row = Math.floor(index / rows);
        const column = index % columns;
        return [row, column];
      };
      const tiles = [];

      for (let i = 0; i < state.tileNumber; i += 1) {
        tiles.push({
          coords: generateCoords(i),
          mined: false,
          hasMine: !!mines.includes(i),
          adjacentMines: 0,
        });
      }

      return {
        ...state,
        mines,
        tiles,
        gameOver: false,
      };
    case 'MINE_TILE':
      const newTiles = gameController.mineTile(state, action);
      return {
        ...state,
        tiles: newTiles,
      };

    case 'BLOW_UP':
      return {
        ...state,
        gameOver: true,
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
  gameOver: false,
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
