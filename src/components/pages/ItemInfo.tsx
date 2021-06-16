import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ItemType, selectItems } from "../../app/store/item/itemsSlice";
import { useAppSelector } from "../../app/hooks";
import { Container } from "@material-ui/core";
import { ItemDetail } from "../molecules/ItemDetail";
import { RadioInput } from "../atoms/RadioInput";
import { SelectToppingForm } from "../molecules/SelectToppingForm";
import { CalcTotal } from "../atoms/CalcTotal";
import { Btn } from "../atoms/Btn";
import { SelectNumForm } from "../atoms/SelectNumForm";
import {
  TAX,
  SIZE_M_STATUS,
  SIZE_L_STATUS,
  SIZE_M_PRICE,
  SIZE_L_PRICE,
} from "../../state/const";
interface Top {
  id: number;
  size: number;
}
const initialTops: Top[] = [];

export const ItemInfo = () => {
  const items = useAppSelector(selectItems);
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
    //オブジェクト
    // { itemId: 1, itemSize: 1,itemNum:3, topping: [{ id: 1, size: 1 }, { id: 2, size: 0 }]}
  };

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
