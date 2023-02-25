import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type TictactoePlayer = "X" | "O"

interface TicTacToeState {
    grid: string[],
    remainingCells: number,
    currentPlayer: TictactoePlayer,
    size: number,
    winnerPosition: Boolean[],
    status: TicTacToeStatus
}

export enum TicTacToeStatus {
    "Menu",
    "Game",
    "End"
}

const initialState: TicTacToeState = {
    grid: [],
    remainingCells: 0,
    currentPlayer: "X",
    size: 3,
    //array representing cell status true if winning cell
    winnerPosition: [],
    status: TicTacToeStatus.Menu
}

export const tictactoeSlice = createSlice({
    name: 'tictactoe',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<TicTacToeStatus>) => {
            state.status = action.payload
        },
        //set the cell at action.payload to the currentPlayer value
        play: (state, action: PayloadAction<number>) => {
            if (state.status !== TicTacToeStatus.Game || state.grid[action.payload] !== "") return;
            //add cell 
            state.grid[action.payload] = state.currentPlayer;
            state.remainingCells--;

            let winnerPosition = checkForWin(state.grid, action.payload)
            if (winnerPosition) {
                state.winnerPosition = winnerPosition;
                state.status = TicTacToeStatus.End;
            }

            if (state.remainingCells === 0) {
                state.status = TicTacToeStatus.End;
            }

            state.currentPlayer = state.currentPlayer === "X" ? "O" : "X"
        },
        //Start a new game
        start: (state) => {
            state.grid = Array(state.size * state.size).fill("");
            state.status = TicTacToeStatus.Game;
            state.winnerPosition = Array(state.size * state.size);
            state.remainingCells = state.size * state.size;
        },
        setSize: (state, action: PayloadAction<number>) => {
            state.size = action.payload;
        },
        setCurrentPlayer: (state, action: PayloadAction<TictactoePlayer>) => {
            state.currentPlayer = action.payload;
        }
    },
})

function checkForWin(board: String[], position: number) {
    const winnerPosition = new Array(board.length)

    const size = Math.sqrt(board.length)
    const x = Math.floor(position / size) * size
    const y = position % size
    let winner = false;

    //check rows
    let win = true;
    for (let i = x; i < x + size; i++) {
        if (board[position] !== board[i]) {
            win = false;
            break;
        }
    }
    //Add all winning cell to  winnerPosition
    if (win) {
        winner = true;
        for (let i = x; i < x + size; i++) {
            winnerPosition[i] = true;
        }
    }

    //check columns
    win = true;
    for (let i = y; i < board.length; i += size) {
        if (board[position] !== board[i]) {
            win = false;
            break;
        }
    }
    //Add all winning cell to  winnerPosition
    if (win) {
        winner = true;
        for (let i = y; i < board.length; i += size) {
            winnerPosition[i] = true;
        }
    }

    //check diagonal uper left to lower right
    if (position - x === y) {//there checking if the position is in diagonal
        win = true;
        for (let i = 0; i < board.length; i += size + 1) {
            if (board[position] !== board[i]) {
                win = false;
                break;
            }
        }
        //Add all winning cell to  winnerPosition
        if (win) {
            winner = true;
            for (let i = 0; i < board.length; i += size + 1) {
                winnerPosition[i] = true;
            }
        }
    }

    //check diagonal lower left to uper right
    if (position - x === y) {//there checking if the position is in diagonal
        win = true;
        for (let i = size - 1; i < board.length - 1; i += size - 1) {
            if (board[position] !== board[i]) {
                win = false;
                break;
            }
        }
        //Add all winning cell to  winnerPosition
        if (win) {
            winner = true;
            for (let i = size - 1; i < board.length - 1; i += size - 1) {
                winnerPosition[i] = true;
            }
        }
    }

    return winner ? winnerPosition : false;
}

export const { setStatus, play, start, setSize, setCurrentPlayer } = tictactoeSlice.actions

export default tictactoeSlice.reducer