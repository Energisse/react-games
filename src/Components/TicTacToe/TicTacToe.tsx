import "./TicTacToe.css";
import Button from '@mui/material/Button';
import CircleIcon from "./CircleIcon";
import CrossIcon from "./CrossIcon";
import GridIcon from "./GridIcon";
import PlayerIcon from "./PlayerIcon";
import Cell from "./Cell";
import { Slider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { start,setSize, setStatus, TicTacToeStatus,setCurrentPlayer } from "./tictactoeSlice";

export default function TicTacToe(){

    const tictactoeState = useAppSelector(state=>state.tictactoe);
    const dispatch = useAppDispatch();

    function handleClickRestart(){
        dispatch(start());
    }

    function handleClickStart(){
        dispatch(start());
    }

    function handleClickShowMenu(){
        dispatch(setStatus(TicTacToeStatus.Menu))
    }

    function handleSizeChange(event: Event, newValue: number | number[]){
        dispatch(setSize(newValue as number))
    }

    return(
        <>
        {tictactoeState.status === TicTacToeStatus.Menu  ? 
            <div style={{width:300}}>
                Menu
                Taille
                <Slider defaultValue={3} step={1} marks min={3} max={10}   valueLabelDisplay="auto" onChange={handleSizeChange} value={tictactoeState.size}/>
                Premier joueur
                <div id="tictactoe-playerselection" >
                    <div className="tictactoe-button-playerselection" style={{background : tictactoeState.currentPlayer === "X" ? "rgba(41, 54, 68,0.5)":""}} onClick={()=>dispatch(setCurrentPlayer("X"))}>
                        <CrossIcon></CrossIcon>
                    </div>
                    <div className="tictactoe-button-playerselection" style={{background : tictactoeState.currentPlayer === "O" ? "rgba(41, 54, 68,0.5)":""}} onClick={()=>dispatch(setCurrentPlayer("O"))}>
                        <CircleIcon></CircleIcon>
                    </div>
                </div>
                <Button onClick={handleClickStart} variant="contained" >jouer</Button>
            </div> :
            <div id="tictactoe-container"  style={{width:100*tictactoeState.size}}>
                <div id="tictactoe-header">
                    <span >C'est a</span> 
                    <div id="tictactoe-curentplayer">
                        <PlayerIcon player={tictactoeState.currentPlayer}/>
                    </div>
                    <span>de jouer</span>
                </div>
                <div id="tictactoe-grid"  style={{width:100*tictactoeState.size, height:100*tictactoeState.size}}>
                    <GridIcon />
                    {tictactoeState.grid.map((cellValue,index)=><Cell value={cellValue} key={index} index={index} />)}
                </div>
                {tictactoeState.status === TicTacToeStatus.End && <Button onClick={handleClickRestart} variant="contained" >Rejouer</Button>}
            <Button onClick={handleClickShowMenu} variant="contained" >Menu</Button>
            </div>
        }
        </>
    )
}





