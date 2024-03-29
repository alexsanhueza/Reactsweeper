import React, { useReducer, createContext } from 'react';
import { gameController } from './game-controller';

export const GameContext = createContext();

export const globalActions = {
  INIT_GAME: 'INIT_GAME',
  MINE_TILE: 'MINE_TILE',
  MARK_TILE: 'MARK_TILE',
  BLOW_UP: 'BLOW_UP',
  CHANGE_DIFFICULTY: 'CHANGE_DIFFICULTY',
};
const tileNumbers = {
  Easy: 100,
  Medium: 256,
  Hard: 400,
};
const mineNumbers = {
  Easy: 25,
  Medium: 40,
  Hard: 70,
};

const initialState = {
  difficulty: 'Medium',
  tileNumber: 256,
  tiles: [],
  mineNumber: 40,
  remainingMines: 40,
  remainingFlags: 40,
  mines: [],
  gameOver: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_GAME': {
      const { mineNumber, tileNumber } = state;

      const mines = [];
      for (let i = 0; i < mineNumber; i += 1) {
        const position = Math.floor(Math.random() * tileNumber);
        if (!mines.includes(position)) mines.push(position);
        else i -= 1;
      }

      const tiles = [];

      for (let i = 0; i < tileNumber; i += 1) {
        tiles.push({
          position: i,
          mined: false,
          hasMine: !!mines.includes(i),
          adjacentMines: 0,
          displayIdx: 0,
        });
      }

      gameController.assignAdjacentMines(tiles);

      return {
        ...state,
        mines,
        tiles,
        gameOver: false,
        remainingMines: mineNumber,
        remainingFlags: mineNumber,
      };
    }
    case 'MINE_TILE': {
      const position = action.payload;
      const newTiles = [...state.tiles];
      gameController.mineTile(position, newTiles);

      return {
        ...state,
        tiles: newTiles,
      };
    }
    case 'MARK_TILE': {
      const position = action.payload;
      const newState = { ...state };

      const { tiles, remainingMines, remainingFlags, isGameWon } =
        gameController.markTile(newState, position);

      return {
        ...state,
        tiles,
        remainingMines,
        remainingFlags,
        gameOver: isGameWon,
      };
    }
    case 'BLOW_UP': {
      return {
        ...state,
        gameOver: true,
      };
    }
    case 'CHANGE_DIFFICULTY': {
      return {
        ...state,
        difficulty: action.payload,
        tileNumber: tileNumbers[action.payload],
        mineNumber: mineNumbers[action.payload],
        remainingMines: mineNumbers[action.payload],
        remainingFlags: mineNumbers[action.payload],
        tiles: [],
        mines: [],
      };
    }
    default:
      return state;
  }
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
