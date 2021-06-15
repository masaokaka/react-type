import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ItemsSlice from "./store/item/itemsSlice";
import SidenavSlice from "./store/sidenavSlice";
import ToppingsSlice from "./store/topping/toppingsSlice";
import UserSlice from "./store/user/userSlice";

export const store = configureStore({
  reducer: {
    sidenav: SidenavSlice,
    user: UserSlice,
    items: ItemsSlice,
    toppings: ToppingsSlice,
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
