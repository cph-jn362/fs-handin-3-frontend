import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/users/UserSlice";
import ProblemSlice from "./features/problems/ProblemSlice";

export const store = configureStore({
    reducer:{ 
        user: UserSlice,
        problem: ProblemSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch