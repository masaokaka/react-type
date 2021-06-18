import { TableCell, TableRow } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import {
  CartItemType,
  CartType,
  setCart,
} from "../../app/store/cart/cartSlice";
import { deleteCartItem } from "../../app/store/cart/cartOperation";
import { selectItems } from "../../app/store/item/itemsSlice";
import { useDispatch } from "react-redux";
import { Btn } from "../atoms/Btn";
import { Price } from "../atoms/Price";
import { selectUser } from "../../app/store/user/userSlice";
import { ToppingsTableCell } from "../atoms/ToppingsTableCell";

interface Props {
  cart: CartType;
  cartItem: CartItemType;
}

export const ItemsTableRow = ({ cart, cartItem }: Props) => {
  const items = useAppSelector(selectItems);
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const doDeleteCartItem = (delItem: CartItemType) => {
    if (user.uid) {
      dispatch(deleteCartItem(delItem, user.uid, cart));
    } else {
      let newCart: CartType = { ...cart };
      newCart.itemInfo = cart.itemInfo!.filter((it) => it.id !== delItem.id);
      dispatch(setCart(newCart));
    }
  };
  return (
    <>
      {items.map(
        (item, index) =>
          item.id === cartItem.itemId && (
            <TableRow key={index}>
              {/* 画像 */}
              <TableCell align="center">
                <img src={item.img} width="180" height="140" alt="カレー" />
              </TableCell>
              {/* 名前 */}
              <TableCell align="center">{item.name}</TableCell>
              {/* 価格 */}
              {cartItem.itemSize === 0 ? (
                <TableCell align="center">
                  <Price price={item.mprice} tax={false} bigsize={false} />
                </TableCell>
              ) : (
                <TableCell align="center">
                  <Price price={item.lprice} tax={false} bigsize={false} />
                </TableCell>
              )}
              <TableCell>{cartItem.itemNum}個</TableCell>
              {/* トッピング */}
              <TableCell align="center">
                {cartItem.toppings.length !== 0 ? (
                  cartItem.toppings.map((cartTopping, index) => (
                    <ToppingsTableCell key={index} cartTopping={cartTopping} />
                  ))
                ) : (
                  <div>なし</div>
                )}
              </TableCell>
              {/* 削除ボタン */}
              <TableCell>
                <Btn text="削除" onClk={() => doDeleteCartItem(cartItem)}></Btn>
              </TableCell>
            </TableRow>
          )
      )}
    </>
  );
};
