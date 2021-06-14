import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sidenavSlice from './store/sidenavSlice';

export const store = configureStore({
  reducer: {
    sidenav:sidenavSlice
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
