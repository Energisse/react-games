import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "./Cell.css";
import { CellInterface, MineSweeperStatus, revealAllNeighbours, setCellFlagged, setCellRevealed } from "./minesweeperSlice";

interface CellProps{
    rowIndex: number;
    columnIndex: number;
    grid: CellInterface[][]

}

const MINE_COLOR = ["blue", "lightblue", "green", "orange", "red", "yellow", "pink", "purple"] as const;

export function Cell({columnIndex,rowIndex,grid}: CellProps) {

    const {isFlagged,isMine,isRevealed,neighbourMines} = grid[rowIndex][columnIndex]

    const dispatch = useDispatch()

    const {status} = useSelector((state: RootState) => state.minesweeper)
    
    function handleCellContext(event: React.MouseEvent<HTMLInputElement>){
        event.preventDefault()
        dispatch(setCellFlagged({row:rowIndex,column:columnIndex}))
    }

    function handleCellClick(event: React.MouseEvent<HTMLInputElement>){
        event.preventDefault()
        dispatch(setCellRevealed({row:rowIndex,column:columnIndex}))
    }

    function handleCellDoubleClick(event: React.MouseEvent<HTMLInputElement>){
        event.preventDefault()
        dispatch(revealAllNeighbours({row:rowIndex,column:columnIndex}))
    }

    const border = useMemo(()=>{
        const borders = []
        if(grid[rowIndex+1] && grid[rowIndex+1][columnIndex]?.isRevealed === false || (grid[rowIndex+1] && grid[rowIndex+1][columnIndex]?.isMine === true)){
            borders.push("border-bottom")
        }
        if(grid[rowIndex-1] && grid[rowIndex-1][columnIndex]?.isRevealed === false || grid[rowIndex-1] && grid[rowIndex-1][columnIndex]?.isMine === true){
            borders.push("border-top")
        }
        if(grid[rowIndex][columnIndex+1]?.isRevealed === false || grid[rowIndex][columnIndex+1]?.isMine === true){
            borders.push("border-right")
        }
        if(grid[rowIndex][columnIndex-1]?.isRevealed === false || grid[rowIndex][columnIndex-1]?.isMine === true){
            borders.push("border-left")
        }
        return borders.join(" ")
    },[rowIndex,columnIndex,grid])
    
    const color = useMemo(()=>MINE_COLOR[Math.floor(Math.random() * MINE_COLOR.length)],[])


    return (
        <div 
        className={
            "minesweeper-cell "  + 
            (isMine && isRevealed && !isFlagged ? "minesweeper-mine-revealed minesweeper-mine-revealed-"+ color:"") +
           
            (!isMine && isRevealed ? 
                "minesweeper-cell-revealed" +
                " minesweeper-cell-"+neighbourMines  + " " +
                border
                :"")
        }
        key={columnIndex} 
        onContextMenu={(event: React.MouseEvent<HTMLInputElement>)=>handleCellContext(event)}
        onClick={(event: React.MouseEvent<HTMLInputElement>)=>handleCellClick(event)}
        onDoubleClick={(event: React.MouseEvent<HTMLInputElement>)=>handleCellDoubleClick(event)}
        >
             {isFlagged && status == MineSweeperStatus.Lose && !isMine ? <div className="minesweeper-wrong-flag"></div>:null}
            {isFlagged && (status != MineSweeperStatus.Lose || isMine)  && "🚩"}
            {isRevealed && !isMine && neighbourMines > 0 &&  neighbourMines}
        </div>
    )
}
