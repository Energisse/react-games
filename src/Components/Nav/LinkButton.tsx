import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export interface LinkButtonProps {
    path:string;
    name:string;
}

export default function LinkButton({name,path}:LinkButtonProps){
    let location = useLocation();
  
    return (
        <Button sx={{
            paddingBottom:0,
            borderBottom: location.pathname == path ? "2px solid" : "é",
            borderRadius:0
        }}>
            <Link to={path} style={{textDecoration:"none",color:"inherit"}} >{name}</Link>
        </Button>
    )
}