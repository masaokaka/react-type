import { ItemType } from "../app/store/item/itemsSlice";
import { CartTopType } from "../app/store/cart/cartSlice";
import {
  TAX,
  SIZE_M_STATUS,
  SIZE_L_STATUS,
  SIZE_M_PRICE,
  SIZE_L_PRICE,
} from "../state/const";

//Id用にランダムな文字列を生成
export const createRandomId = (): string => {
  return Math.random().toString(32).substring(2);
};
//小計計算処理(税込)
export const calcTotal = (
  item: ItemType,
  itemSize: number,
  itemNum: number,
  addedToppings: CartTopType[],
) => {
  let total = 0;
  if (itemSize === SIZE_M_STATUS) {
    total += item.mprice * itemNum;
  } else if (itemSize === SIZE_L_STATUS) {
    total += item.lprice * itemNum;
  }
  let selectedToppings: CartTopType[] = addedToppings.filter((top) => top.size !== 9);
  selectedToppings.forEach((top) => {
    if (top.size === SIZE_M_STATUS) {
      total += SIZE_M_PRICE * itemNum;
    } else if (top.size === SIZE_L_STATUS) {
      total += SIZE_L_PRICE * itemNum;
    }
  });
  return total
};
