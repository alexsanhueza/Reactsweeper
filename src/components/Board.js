import React, { useContext } from 'react';
import { GameContext } from '../context';

import Tile from './Tile';

const Board = () => {
  const { tileNumber } = useContext(GameContext);

  const [rows, columns] = [Math.sqrt(tileNumber), Math.sqrt(tileNumber)];

  const generateTileId = (index) => {
    const row = Math.floor(index / rows);
    const column = index % columns;
    return [row, column];
  };
  const tiles = [];

  for (let i = 0; i < tileNumber; i += 1) {
    tiles.push(<Tile key={i} coords={generateTileId(i)} />);
  }

  return (
    <div id="board" className="medium">
      {tiles}
    </div>
  );
};

export default Board;
