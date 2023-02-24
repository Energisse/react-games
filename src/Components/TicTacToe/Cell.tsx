import PlayerIcon from "./PlayerIcon"

export interface CellProps{
    value : string,
    onClick : (index:number)=>void,
    index : number,
    winner : boolean
}

export default function Cell({value,onClick,index,winner}:CellProps){
    return (
        <div className={"tictactoe-cell "+ (winner === true ? "tictactoe-cell-winner":"")} onClick={()=>onClick(index)}>
            <PlayerIcon player={value}/>
        </div>
    )
}
