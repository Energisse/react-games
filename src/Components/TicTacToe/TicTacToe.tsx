import { useEffect, useState } from "react";
import "./TicTacToe.css";
import Button from '@mui/material/Button';
import CircleIcon from "./CircleIcon";
import CrossIcon from "./CrossIcon";
import GridIcon from "./GridIcon";
import PlayerIcon from "./PlayerIcon";
import Cell from "./Cell";

export default function TicTacToe(){

    const [grid,setGrid] = useState<string[]>(Array(9).fill(""));
    const [remainingCells,setRemainingCells] = useState<number>(9);
    const [currentPlayer,setCurrentPlayer] = useState<string>("X");
    const [end,setEnd] = useState<boolean>(false);
    const [winnerPosition,setWinnerPosition] = useState<boolean[]>(Array(9));

    function handleCellClick(index:number){
        if(end || grid[index] != "")return;
        grid[index] = currentPlayer;
       
        let winnerPosition = checkForWin(grid)
        if(winnerPosition){
            setWinnerPosition(winnerPosition);
            setEnd(true)
        }
       
        if(remainingCells-1 == 0){
            setEnd(true);
        }

        setGrid(grid);
        setRemainingCells(remainingCells-1);
        setCurrentPlayer(currentPlayer == "X" ? "O" : "X")
    }

    function handleClickRestart(){
        setGrid(Array(9).fill(""))
        setEnd(false)
        setWinnerPosition(Array(9))
        setRemainingCells(9)
    }

    return(
        <div id="tictactoe-container">
            <div id="tictactoe-header">
                <span >C'est a</span> 
                <div id="tictactoe-curentplayer">
                    <PlayerIcon player={currentPlayer}/>
                </div>
                <span>de jouer</span>
            </div>
            <div id="tictactoe-grid">
                <GridIcon/>
                {grid.map((cellValue,index)=><Cell value={cellValue} key={index} onClick={handleCellClick} index={index} winner={winnerPosition[index]} />)}
            </div>
           <Button onClick={handleClickRestart} variant="contained" sx={{visibility:end?"visible":"hidden"}}>Rejouer</Button>
        </div>
    )
}


function checkForWin(board:String[]) {
    const winnerPosition = new Array(9)

    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
      
    for (let i = 0; i < winningPatterns.length; i++) {
        const [a, b, c] = winningPatterns[i];
        if (board[a] && board[a] ===board[b] && board[a] === board[c]) {
            winnerPosition[a] = true
            winnerPosition[b] = true
            winnerPosition[c] = true
            return winnerPosition;
        }
    }
    return false;
  }


