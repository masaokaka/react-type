import { db, fieldValue } from "../../../lib/firebase";
import { setOrders, OrderInfoType, OrderType } from "./ordersSlice";
import { unsetCart } from "../cart/cartSlice";
import { AppThunk } from "../../store";
import { ORDER_STATUS_CART } from "../../../state/const";

//注文確定
export const order =
  (cartId: string, uid: string, order: OrderInfoType): AppThunk =>
  (dispatch): void => {
    db.collection(`users/${uid}/order`)
      .doc(cartId)
      .update(order)
      .then(() => {
        dispatch(unsetCart());
      })
      .catch((error) => {
        alert(error);
      });
  };

//注文履歴の取得
export const fetchOrders =
  (uid: string): AppThunk =>
  (dispatch): void => {
    db.collection(`users/${uid}/order`)
      .get()
      .then((snapShot) => {
        let orders: OrderType[] = [];
        snapShot.forEach((doc) => {
          if (doc.data().status !== ORDER_STATUS_CART) {
            let order: OrderType = doc.data();
            order.id = doc.id;
            orders = [...orders, order];
          }
        });
        dispatch(setOrders(orders));
      })
      .catch((error) => {
        alert(error);
      });
  };
