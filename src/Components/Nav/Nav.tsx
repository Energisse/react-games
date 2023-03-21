import LinkButton from "./LinkButton";

export default function Nav(){
    return(
        <nav>
          <LinkButton path={"/tictactoe"} name={"Tic-tac-toe"}/>
          <LinkButton path={"/minesweeper"} name={"Minesweeper"}/>
        </nav>
    )
}