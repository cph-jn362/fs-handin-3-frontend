import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "./UserAPI";
import { UserEntity } from "./UserEntity";
import * as SecureStore from "expo-secure-store";

export const login = createAsyncThunk(
  "loginUser",
  async (user: UserEntity, thunkAPI) => {
    const response = await UserAPI.login(user);

    console.log(response.access_token)

    SecureStore.setItemAsync("token", response.access_token);

    return response;
  }
);

export const signup = createAsyncThunk(
  "signupUser",
  async (user: UserEntity, thunkAPI) => {
    const response = await UserAPI.signup(user);
    return response;
  }
);

interface UserState {
  token: string | undefined | null;
  error: string | undefined;
}

const initialState = {
  token: undefined,
  error: undefined,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("running signup fulfilled");
      state.error = undefined;
      if (action.payload.id != undefined) {
        state.error = "Signup | success";
      }
    })
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("running login fulfilled");
      state.error = undefined;
      state.token = action.payload?.access_token;
    })
    builder.addCase(login.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 401") {
        state.error = "Invalid login";
        state.token = undefined;
      }
      console.log("error in slice", action.error);
    })
  },
});

export const { updateToken } = userSlice.actions;

export default userSlice.reducer;
