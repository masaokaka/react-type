import { db, fieldValue } from "../../../lib/firebase";
import { setCart, CartItemType, CartType } from "./cartSlice";
import { AppThunk } from "../../store";

//カートの更新
export const updateCart =
  (cartItem: CartItemType, uid: string, cart: CartType): AppThunk =>
  (dispatch) => {
    db.collection(`users/${uid}/order`)
      .doc(cart.id)
      .update({ itemInfo: fieldValue.arrayUnion(cartItem) })
      .then(() => {
        cart.itemInfo?.push(cartItem);
        dispatch(setCart(cart));
      })
      .catch((error) => {
        alert(error);
      });
  };

//カートの新規作成
export const createCart =
  (cartItem: CartItemType, uid: string): AppThunk =>
  (dispatch) => {
    let cart: CartType = {
      userId: uid,
      itemInfo: [cartItem],
      status: 0,
    };
    db.collection(`users/${uid}/order`)
      .add(cart)
      .then((doc) => {
        cart.id = doc.id;
        dispatch(setCart(cart));
      })
      .catch((error) => {
        alert(error);
      });
  };

//カートの取得
export const fetchCart =
  (uid: string): AppThunk =>
    (dispatch) => {
    db.collection(`users/${uid}/order`)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          if (doc.data().status === 0) {
            let cart: CartType = doc.data();
            cart.id = doc.id;
            dispatch(setCart(cart));
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
