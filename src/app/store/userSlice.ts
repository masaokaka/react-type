import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface userState {
  email: string | null;
  password: string | null;
}

const initialState: userState = { email: null, password: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<userState>) => {
      return (state = action.payload);
    },
    login: (state, action: PayloadAction<userState>) => {},
  },
});

export const { register } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

//非同期処理
