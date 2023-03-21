import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CellPosition {
    row: number,
    column: number
}

export enum Dificulte {
    "Easy",
    "Medium",
    "Hard"
}

interface MineSweeperState {
    grid: CellInterface[][],
    remainingCells: number,
    gererated: boolean,
    mineCount: number,
    rowCount: number,
    colunmCount: number,
    status: MineSweeperStatus,
    flagCount: number,
    dificulte: Dificulte,
    timer: number
}

export interface CellInterface {
    isFlagged: boolean;
    isMine: boolean;
    isRevealed: boolean;
    neighbourMines: number;
}


export enum MineSweeperStatus {
    "Pause",
    "Game",
    "Lose",
    "Win",
}

const defaultRowSize = 8;
const defaultColumnSize = 10;
const defaultMine = 10;

const initialState: MineSweeperState = {
    grid: generateGrid(defaultRowSize, defaultColumnSize),
    remainingCells: 0,
    gererated: false,
    mineCount: defaultMine,
    rowCount: defaultRowSize,
    colunmCount: defaultColumnSize,
    status: MineSweeperStatus.Pause,
    flagCount: 0,
    timer: 0,
    dificulte: Dificulte.Easy
}

const neighbours: Array<[number, number]> = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1]
]

export const MineSweeperSlice = createSlice({
    name: 'MineSweeper',
    initialState,
    reducers: {
        timerTick(state) {
            state.timer++;
        },
        play: (state, { payload: dificulte }: PayloadAction<Dificulte>) => {
            let rowCount, colunmCount, mineCount;
            state.dificulte = dificulte;
            state.timer = 0;
            switch (dificulte) {
                case Dificulte.Easy:
                    rowCount = 8
                    colunmCount = 10
                    mineCount = 10
                    break
                case Dificulte.Medium:
                    rowCount = 14
                    colunmCount = 18
                    mineCount = 40
                    break
                case Dificulte.Hard:
                    rowCount = 20
                    colunmCount = 24
                    mineCount = 99
                    break
            }
            state.remainingCells = rowCount * colunmCount - mineCount;
            state.gererated = false;
            state.grid = generateGrid(rowCount, colunmCount)
            state.gererated = false;
            state.mineCount = mineCount;
            state.rowCount = rowCount;
            state.colunmCount = colunmCount;
            state.status = MineSweeperStatus.Pause;
            state.flagCount = 0;
        },
        setCellFlagged: (state, { payload: { row, column } }: PayloadAction<CellPosition>) => {
            if (state.status !== MineSweeperStatus.Game) return;
            if (state.grid[row][column].isRevealed) return;
            if (state.flagCount === state.mineCount && !state.grid[row][column].isFlagged) return;
            state.flagCount += state.grid[row][column].isFlagged ? -1 : 1
            state.grid[row][column].isFlagged = !state.grid[row][column].isFlagged
        },
        setCellRevealed: (state, { payload: { row, column } }: PayloadAction<CellPosition>) => {
            if (state.status !== MineSweeperStatus.Game && state.status !== MineSweeperStatus.Pause) return;
            state.status = MineSweeperStatus.Game;
            if (!state.gererated) {
                const arrayPool = [...new Array(state.rowCount * state.colunmCount).keys()];
                //remove first play to win every time
                arrayPool.splice(column * state.rowCount + row, 1)

                for (let i = 0; i < state.mineCount; i++) {
                    const random = Math.floor(Math.random() * arrayPool.length);
                    const randomCell = arrayPool.splice(random, 1)[0]
                    const x = randomCell % state.rowCount
                    const y = Math.floor(randomCell / state.rowCount)
                    state.grid[x][y].isMine = true
                    neighbours.forEach(([rowVector, columnVector]) => {
                        if (!state.grid[x + rowVector]) return;
                        if (state.grid[x + rowVector][y + columnVector]) state.grid[x + rowVector][y + columnVector].neighbourMines++
                    })
                }
                state.gererated = true;
            }
            revealCell(state, { row, column });
        },
        revealAllNeighbours: (state, { payload: { column, row } }: PayloadAction<CellPosition>) => {
            if (state.status !== MineSweeperStatus.Game) return;
            if (!state.gererated) return;
            if (!state.grid[row][column].isRevealed) return;
            //count flagged neighbours 
            let flaggedNeighbours = 0;
            neighbours.forEach(([rowNeighbour, columnNeighbour]) => {
                if (state.grid[row + rowNeighbour] && state.grid[row + rowNeighbour][column + columnNeighbour]) {
                    if (state.grid[row + rowNeighbour][column + columnNeighbour].isFlagged) flaggedNeighbours++
                }
            })

            if (flaggedNeighbours !== state.grid[row][column].neighbourMines) return;
            neighbours.forEach(([rowNeighbour, columnNeighbour]) => {
                if (state.grid[row + rowNeighbour] && state.grid[row + rowNeighbour][column + columnNeighbour]) {
                    revealCell(state, { row: row + rowNeighbour, column: column + columnNeighbour });
                }
            })
        },
    }
})

function generateGrid(row: number, column: number) {
    return new Array(row).fill(undefined).map(() => new Array(column).fill(undefined).map((el) => (
        {
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighbourMines: 0
        }
    )))
}

function revealCell(state: MineSweeperState, { row, column }: CellPosition) {
    if (state.grid[row][column].isFlagged) return;
    if (state.grid[row][column].isMine) {
        state.grid[row][column].isRevealed = true;
        state.status = MineSweeperStatus.Lose
        return
    }
    if (!state.grid[row][column].isRevealed) {
        state.remainingCells--;
        if (state.remainingCells === 0) state.status = MineSweeperStatus.Win
    }
    state.grid[row][column].isRevealed = true;
    if (!state.grid[row][column].neighbourMines) {
        const stack: [CellPosition] = [{ row, column }]
        let cellPosition;
        while ((cellPosition = stack.pop()) !== undefined) {
            const { row, column } = cellPosition;
            neighbours.forEach(([rowVector, columnVector]) => {
                let neighbourRow = rowVector + row;
                let neighbourColulmn = columnVector + column;
                if (!state.grid[neighbourRow]) return;
                if (!state.grid[neighbourRow][neighbourColulmn]) return;
                if (!state.grid[neighbourRow][neighbourColulmn].isRevealed) {
                    state.remainingCells--;
                    if (state.remainingCells === 0) state.status = MineSweeperStatus.Win
                    state.grid[neighbourRow][neighbourColulmn].isRevealed = true;
                    if (state.grid[neighbourRow][neighbourColulmn].neighbourMines === 0) {
                        stack.push({ row: neighbourRow, column: neighbourColulmn })
                    }
                }
            })
        }
    }
}

export const { play, setCellFlagged, setCellRevealed, revealAllNeighbours, timerTick } = MineSweeperSlice.actions

export default MineSweeperSlice.reducer

