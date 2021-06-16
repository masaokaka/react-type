import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ItemType, selectItems } from "../../app/store/item/itemsSlice";
import { useAppSelector } from "../../app/hooks";
import { Container } from "@material-ui/core";
import { ItemDetail } from "../molecules/ItemDetail";
import { RadioInput } from "../atoms/RadioInput";
import { SelectToppingForm } from "../molecules/SelectToppingForm";
import { CalcTotal } from "../atoms/CalcTotal";
import { Btn } from "../atoms/Btn";
import { SelectNumForm } from "../atoms/SelectNumForm";
import { createRandomId } from "../../utils/functions";
import {
  TAX,
  SIZE_M_STATUS,
  SIZE_L_STATUS,
  SIZE_M_PRICE,
  SIZE_L_PRICE,
} from "../../state/const";
import { selectUser } from "../../app/store/user/userSlice";
import {
  setCart,
  selectCart,
  CartType,
  CartItemType,
} from "../../app/store/cart/cartSlice";
import { updateCart, createCart } from "../../app/store/cart/cartOperation";
interface Top {
  id: number;
  size: number;
}
const initialTops: Top[] = [];

export const ItemInfo = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectItems);
  const cart = useAppSelector(selectCart);
  const [addedToppings, setAddedToppings] = useState(initialTops);
  const [itemSize, setItemSize] = useState(SIZE_M_STATUS);
  const [itemNum, setItemNum] = useState(1);
  const { itemid }: { itemid: string } = useParams();
  const [item, setItem] = useState<ItemType>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    items.forEach((item): void => {
      if (item.id === parseInt(itemid)) {
        setItem(item);
      }
    });
  }, [itemid]);

  useEffect(() => {
    if (item !== undefined) {
      let total: number = 0;
      if (itemSize === SIZE_M_STATUS) {
        total += item.mprice * itemNum;
      } else if (itemSize === SIZE_L_STATUS) {
        total += item.lprice * itemNum;
      }
      let selectedToppings: Top[] = addedToppings.filter(
        (top) => top.size !== 9
      );
      selectedToppings.forEach((top) => {
        if (top.size === SIZE_M_STATUS) {
          total += SIZE_M_PRICE * itemNum;
        } else if (top.size === SIZE_L_STATUS) {
          total += SIZE_L_PRICE * itemNum;
        }
      });
      setTotalPrice(total + total * TAX);
    }
  }, [addedToppings, itemSize, itemNum]);

  const doAddCart = () => {
    let selectedToppings: Top[] = addedToppings.filter((top) => top.size !== 9);
    let cartItem: CartItemType = {
      id: createRandomId(),
      itemId: parseInt(itemid),
      itemNum: itemNum,
      itemSize: itemSize,
      toppings: selectedToppings,
    };
    if (user.uid) {
      if (Object.keys(cart).length !== 0) {
        dispatch(updateCart(cartItem, user.uid));
      } else {
        dispatch(createCart(cartItem, user.uid));
      }
    } else {
      if (Object.keys(cart).length === 0) {
        let newCart = {
          itemInfo: [cartItem],
          status: 0,
        };
        dispatch(setCart(newCart));
      } else {
        let newCart: CartType = JSON.parse(JSON.stringify(cart));
        if (newCart.itemInfo !== undefined) {
          newCart.itemInfo.push(cartItem);
          dispatch(setCart(newCart));
        }
      }
    }
  };
  console.log(cart);
  return (
    <Container>
      <h2>商品詳細</h2>
      <ItemDetail item={item} />
      <RadioInput item={item} itemSize={itemSize} setItemSize={setItemSize} />
      <SelectNumForm itemNum={itemNum} setItemNum={setItemNum} />
      <SelectToppingForm
        addedToppings={addedToppings}
        setAddedToppings={setAddedToppings}
      />
      <CalcTotal totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
      <Btn text="カートに追加する" onClk={() => doAddCart()} />
    </Container>
  );
};
