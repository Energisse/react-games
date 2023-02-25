import CircleIcon from "./CircleIcon";
import CrossIcon from "./CrossIcon";

export interface PlayerIconProps{
    player : string,
}

export default function PlayerIcon({player}:PlayerIconProps){
    if(player === "X")return CrossIcon();
    if(player === "O")return CircleIcon();
    return null;
}
