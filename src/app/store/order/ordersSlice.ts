import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CartItemType } from "../cart/cartSlice";

export interface OrderInfoType {
  name: string;
  email: string;
  zipcode: string;
  address: string;
  tel: string;
  status: number;
  orderDatetime?: string;
  payType?: number;
  cardNo?: string;
  timestamp?: number;
}

export interface OrderType {
  id?: string;
  userId?: string;
  itemInfo?: CartItemType[];
  status?: number;
  name?: string;
  email?: string;
  zipcode?: string;
  address?: string;
  tel?: string;
  orderDatetime?: string;
  payType?: number;
  cardNo?: string;
  timestamp?: number;
}

const initialState: OrderType[] = [];

export const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderType[]>) => {
      return (state = action.payload);
    },
    unsetOrders: (state) => {
      return (state = initialState);
    },
  },
});

export const { setOrders, unsetOrders } = ordersSlice.actions;
export const selectOrders = (state: RootState): OrderType[] => state.orders;

export default ordersSlice.reducer;
