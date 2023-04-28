import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProblemEntity } from "./ProblemEntity";
import { ProblemAPI } from "./ProblemAPI";

export const fetchAllProblems = createAsyncThunk(
  "problem/fetchAllProblems",
  async (thunkAPI) => {
    const response = ProblemAPI.fetchAllProblems();
    return response;
  }
);

export const createProblem = createAsyncThunk(
  "problem/create",
  async (problem: ProblemEntity, thunkAPI) => {
    const response = ProblemAPI.create(problem);
    return response;
  }
);

interface ProblemState {
  problem: ProblemEntity[];
}

const initialState = {
  problem: [],
} as ProblemState;

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProblems.fulfilled, (state, action) => {
      state.problem = action.payload;
    });
    builder.addCase(createProblem.fulfilled, (state, action) => {
      state.problem.push(action.payload);
    });
  },
});

export default problemSlice.reducer;
