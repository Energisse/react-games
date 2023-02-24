import LinkButton from "./LinkButton";

export default function Nav(){
    return(
        <nav>
          <LinkButton path={"/tictactoe"} name={"Tic-tac-toe"}/>
        </nav>
    )
}