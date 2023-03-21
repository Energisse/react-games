import { Button, NativeSelect } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Cell } from "./Cell";
import "./Minesweeper.css";
import { CellPosition, Dificulte, MineSweeperStatus, play, timerTick } from "./minesweeperSlice";

let revealMineInterval: NodeJS.Timer;
let timerInterval: NodeJS.Timer;

export default function Minesweeper(){

    const {mineCount,status,grid:originalGrid,flagCount,timer,dificulte} = useAppSelector(({minesweeper})=>minesweeper)
    const [grid,setGrid] = useState(originalGrid)
    const dispatch = useAppDispatch();

    function handleChangeDificulte(event: React.ChangeEvent<HTMLSelectElement>){
        dispatch(play(+event.target.value as Dificulte));
    }

    useEffect(()=>{
        setGrid(originalGrid)
    },[originalGrid])

    useEffect(()=>{
        if(timerInterval)clearInterval(timerInterval)
        if(status === MineSweeperStatus.Win){
            clearInterval(timerInterval)
        }
        if(status === MineSweeperStatus.Game){
            timerInterval =  setInterval(()=>dispatch(timerTick()),1000)
        }
        if(status === MineSweeperStatus.Lose){
            const mines: CellPosition[] = []
            grid.forEach((row, rowIndex) => {
                row.forEach(({ isMine, isFlagged }, columnIndex) => {
                    if (isMine && !isFlagged) {
                        mines.push({ column: columnIndex, row: rowIndex })
                    }
                })
            })
            const minesIndex = [...mines.keys()];
            revealMineInterval = setInterval(() => {
                const i = Math.floor(Math.random() * minesIndex.length)
                const { column, row } = mines[minesIndex.splice(i, 1)[0]]
                setGrid(grid => {
                    grid = [...grid]
                    grid[row] = [...grid[row]]
                    grid[row][column] = {
                    ...grid[row][column],
                    isRevealed: true
                }
                return grid
            })
                if (minesIndex.length === 0) clearInterval(revealMineInterval)
            }, 100)
        }
        return ()=>{
            clearInterval(revealMineInterval)
            clearInterval(timerInterval)
        }
    },[status,dispatch,grid])

    function handlePlay(){
        dispatch(play(dificulte))
    }

    return (
        <div id="minesweeper-container">
            <div id="minesweeper-header">
                <NativeSelect
                    onChange={handleChangeDificulte}
                    value={dificulte}
                    inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                    }}
                    disableUnderline
                    sx={{color:"black",backgroundColor:"white",borderRadius:"5px"}}
                >
                    <option value={Dificulte.Easy}>Facile</option>
                    <option value={Dificulte.Medium}>Moyen</option>
                    <option value={Dificulte.Hard}>Dificile</option>
                </NativeSelect>
                <div>
                    {timer}🕑
                </div>
                <div>
                    {mineCount - flagCount}🚩
                </div>
            </div>
            <div id="minesweeper-grid-container">
            {grid.map((column,rowIndex)=>
                <div className="minesweeper-row" key={rowIndex}>
                    {column.map((_,columnIndex)=>
                        <Cell grid={grid} columnIndex={columnIndex} rowIndex={rowIndex} key={rowIndex*grid.length+columnIndex}/>
                    )}
                </div>
            )}
            </div>
            <Button onClick={handlePlay}>Rejouer</Button>
        </div>
    )
}