import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { selectItems } from "../../app/store/item/itemsSlice";
import { useAppSelector } from "../../app/hooks";
import { Container } from "@material-ui/core";
import { ItemDetail } from "../molecules/ItemDetail";
import { SelectToppingForm } from "../molecules/SelectToppingForm";
import { CalcTotal } from "../molecules/CalcTotal";
import { Btn } from "../atoms/Btn";
interface Top {
  id: number;
  size: number;
}
const initialTops: Top[] = [];

export const ItemInfo = () => {
  const items = useAppSelector(selectItems);
  const [addedToppings, setAddedToppings] = useState(initialTops);
  const { itemid }: { itemid: string } = useParams();
  const [item, setItem] = useState({});
  useEffect(() => {
    items.forEach((item): void => {
      if (item.id === parseInt(itemid)) {
        setItem(item);
      }
    });
  }, [itemid]);

  const doAddCart = () => {};

  return (
    <Container>
      <h2>商品詳細</h2>
      <ItemDetail item={item} />
      <SelectToppingForm
        addedToppings={addedToppings}
        setAddedToppings={setAddedToppings}
      />
      <CalcTotal />
      <Btn text="カートに追加する" onClk={() => doAddCart()} />
    </Container>
  );
};
