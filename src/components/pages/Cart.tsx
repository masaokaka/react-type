import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCart } from "../../app/store/cart/cartSlice";
import { selectItems } from "../../app/store/item/itemsSlice";
import { selectUser } from "../../app/store/user/userSlice";
import { selectUserInfo } from "../../app/store/userinfo/userinfoSlice";
import { fetchCart } from "../../app/store/cart/cartOperation";
import { Container } from "@material-ui/core";
import { ItemsTable } from "../organisms/ItemsTable";
import { OrderForm } from "../organisms/OrderForm";
import { Btn } from "../atoms/Btn";
import { Price } from "../atoms/Price";
import { calcTotal } from "../../utils/functions";

export const Cart = () => {
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectItems);
  const userInfo = useAppSelector(selectUserInfo);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    user.uid && dispatch(fetchCart(user.uid));
  }, []);
  const showOrderForm = () => {
    user.uid ? setShow(true) : history.push("/login");
  };

  useEffect(() => {
    if (cart.itemInfo !== undefined) {
      let total = 0;
      cart.itemInfo.forEach((cartItem) => {
        total += calcTotal(
          items,
          Number(cartItem.itemId),
          cartItem.itemSize,
          cartItem.itemNum,
          cartItem.toppings
        );
      });
      setTotalPrice(total);
    }
  }, [cart]);

  return (
    <Container>
      <h2>カート</h2>
      {cart.itemInfo !== undefined ? (
        cart.itemInfo.length !== 0 ? (
          <>
            <ItemsTable cart={cart} show={show} />
            <Price price={totalPrice} bigsize={true} tax={true} />
            {show ? (
              <OrderForm cartId={cart.id!} userInfo={userInfo} uid={user.uid!} />
            ) : (
              <Btn text="注文に進む" onClk={() => showOrderForm()} />
            )}
          </>
        ) : (
          <div>商品がありません</div>
        )
      ) : (
        <div>商品がありません</div>
      )}
    </Container>
  );
};
