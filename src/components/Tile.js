import React, { useState } from 'react';

const Tile = ({ coords }) => {
  const displayModes = [null, <img src="/flag.png" alt="flagged" />, <b>?</b>];

  const [mined, setMined] = useState(false);
  const [display, setDisplay] = useState(0);

  const mine = () => {
    if (!mined) setMined(true);
  };

  const toggleMarkup = () => {
    setDisplay((display) => (display + 1) % 3);
  };

  const minedClass = !mined ? 'unmined' : 'mined';

  return (
    <div
      className={`tile ${minedClass}`}
      onClick={mine}
      onContextMenu={(e) => {
        e.preventDefault();
        toggleMarkup();
      }}
    >
      {displayModes[display]}
    </div>
  );
};

export default Tile;
