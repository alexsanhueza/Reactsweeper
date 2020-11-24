import '../styles/App.css';
import Header from './Header';
import Board from './Board';
import { GameContext } from '../context';

function App() {
  const contextValue = { difficulty: 'Medium', tileNumber: 256, tiles: {} };

  return (
    <GameContext.Provider value={contextValue}>
      <div id="app">
        <Header />
        <Board />
      </div>
    </GameContext.Provider>
  );
}

export default App;
