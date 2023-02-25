import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";

const padding = 20;
const spawingTimming = 500;

export default function GridIcon(){
    
    const {size} = useAppSelector(state=>state.tictactoe)
    const [rows,setRows] = useState<JSX.Element[]>([]);
    const [rowsTimeout,setRowTimeouts] = useState<NodeJS.Timeout[]>([]);

    useEffect(()=>{
        console.log(size)
        const length = 100*size - padding*2
        const end = 100*(size)-20
        rowsTimeout.forEach(clearTimeout);

        for (let i = 0; i < size-1; i++){
            const start = 100*(i+1)
            rowsTimeout.push(setTimeout(()=>{
                console.log(rows)
                rows.push( <line x1={padding} y1={start} x2={end} y2={start} key={i*2} strokeDasharray={length} strokeDashoffset={length}/>);
                rows.push( <line x1={start} y1={padding} x2={start} y2={end} key={i*2+1} strokeDasharray={length} strokeDashoffset={length}/>);
                setRows([...rows])
            },spawingTimming/(size-1)*i))
            setRowTimeouts(rowsTimeout)
        }
    },[size])
  
    return (
        <svg className="tictactoe-svg-grid" width={100*size} height={100*size}>
            {rows}
        </svg>
    )
}