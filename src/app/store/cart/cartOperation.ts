import { db } from "../../../lib/firebase";
import { setCart, unsetCart, CartItemType, CartType } from "./cartSlice";
import { AppThunk } from "../../store";
import { ITEM_TABLE_ID, ITEM_TABLE_PATH } from "../../../state/admin";

//カートの更新
export const updateCart =
  (cartItem: CartItemType, uid: string): AppThunk =>
  (dispatch) => {
    db.collection(ITEM_TABLE_PATH)
      .doc(ITEM_TABLE_ID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let data = doc.data();
          if (data !== undefined) {
            dispatch(setCart(data.itemData));
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

//カートの新規作成
export const createCart =
  (cartItem: CartItemType, uid: string): AppThunk =>
  (dispatch) => {
    let order: CartType = {
      userId: uid,
      itemInfo: [cartItem],
      status: 0,
    };
    db.collection(`users/${uid}/order`)
      .add(order)
      .then((doc) => {
        order.id = doc.id;
        dispatch(setCart(order));
      })
      .catch((error) => {
        alert(error);
      });
  };

//カートの取得
// export const fetchCart = (): Appthunk => (dispatch) => {};
