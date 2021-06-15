import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import sidenavSlice from "./store/sidenavSlice";
import userSlice from "./store/userSlice";

export const store = configureStore({
  reducer: {
    sidenav: sidenavSlice,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
