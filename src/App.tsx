import './App.css';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import { Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Minesweeper from './Components/Minesweeper/Minesweeper';

function App() {
  return (
      <>
        <Nav></Nav>
        <div id="app">
          <Routes>
            <Route >
              <Route path="/tictactoe" element={<TicTacToe />} />
              <Route path="/minesweeper" element={<Minesweeper />} />
              </Route>
          </Routes>
        </div>
      </>
  );
}




export default App;
