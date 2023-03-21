import { configureStore } from '@reduxjs/toolkit'
import tictactoeSlice from '../Components/TicTacToe/tictactoeSlice'
import { composeWithDevTools } from 'redux-devtools-extension'
import minesweeperSlice from '../Components/Minesweeper/minesweeperSlice'

export const store = configureStore({
    reducer: {
        tictactoe: tictactoeSlice,
        minesweeper: minesweeperSlice,
    },
    devTools: false,
    enhancers: [composeWithDevTools()]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch