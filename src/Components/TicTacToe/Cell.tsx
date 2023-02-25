import { useAppDispatch, useAppSelector } from "../../app/hooks"
import PlayerIcon from "./PlayerIcon"
import { play } from "./tictactoeSlice"

export interface CellProps{
    value : string,
    index : number,
}

export default function Cell({value,index}:CellProps){

    const dispatch = useAppDispatch();
    const {winnerPosition} = useAppSelector(state=>state.tictactoe);

    function handleCellClick(){
        dispatch(play(index))
    }
    
    return (
        <div className={"tictactoe-cell "+ (winnerPosition[index] === true ? "tictactoe-cell-winner":"")} onClick={handleCellClick}>
            <PlayerIcon player={value}/>
        </div>
    )
}
