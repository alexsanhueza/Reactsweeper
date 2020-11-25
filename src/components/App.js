import '../styles/App.css';
import Header from './Header';
import Board from './Board';
import { GameContextProvider } from '../context';

function App() {
  return (
    <GameContextProvider>
      <div id="app">
        <Header />
        <Board />
      </div>
    </GameContextProvider>
  );
}

export default App;
