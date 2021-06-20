import { db, fieldValue } from "../../../lib/firebase";
import { setCart, CartItemType, CartType } from "./cartSlice";
import { ORDER_STATUS_CART } from "../../../state/const";
import { AppThunk } from "../../store";

//カートの更新
export const updateCart =
  (cartItem: CartItemType, uid: string, cart: CartType): AppThunk =>
  (dispatch): void => {
    db.collection(`users/${uid}/order`)
      .doc(cart.id)
      .update({ itemInfo: fieldValue.arrayUnion(cartItem) })
      .then(() => {
        let newCart: CartType = { ...cart };
        newCart.itemInfo = [...cart.itemInfo!, cartItem];
        dispatch(setCart(newCart));
      })
      .catch((error) => {
        alert(error);
      });
  };

//カートの新規作成
export const createCart =
  (cartItem: CartItemType, uid: string): AppThunk =>
  (dispatch): void => {
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
  (dispatch): void => {
    db.collection(`users/${uid}/order`)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          if (doc.data().status === ORDER_STATUS_CART) {
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

//カートの商品削除
export const deleteCartItem =
  (delItem: CartItemType, uid: string, cart: CartType): AppThunk =>
  (dispatch): void => {
    db.collection(`users/${uid}/order`)
      .doc(cart.id)
      .update({ itemInfo: fieldValue.arrayRemove(delItem) })
      .then(() => {
        let newCart: CartType = { ...cart };
        newCart.itemInfo = cart.itemInfo!.filter((it) => it.id !== delItem.id);
        dispatch(setCart(newCart));
      })
      .catch((error) => {
        alert(error);
      });
  };
