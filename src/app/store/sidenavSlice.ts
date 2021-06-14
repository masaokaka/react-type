import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const sidenavSlice = createSlice({
  name: "sidenav",
  initialState: false,
  reducers: {
    toggle: (state, action: PayloadAction<boolean>) => {
      return state = action.payload;
    },
  },
});

export const { toggle } = sidenavSlice.actions;
export const selectSidenav = (state: RootState) => state.sidenav;

export default sidenavSlice.reducer;
