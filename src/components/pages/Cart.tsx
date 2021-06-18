import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { selectCart } from "../../app/store/cart/cartSlice";
import { selectUser } from "../../app/store/user/userSlice";
import { fetchCart } from "../../app/store/cart/cartOperation";
import { Container } from "@material-ui/core";
import { ItemsTable } from "../organisms/ItemsTable";
import { OrderForm } from "../organisms/OrderForm";

export const Cart = () => {
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    user.uid && dispatch(fetchCart(user.uid));
  }, []);
  return (
    <Container>
      <h2>カート</h2>
      {cart.itemInfo !== undefined ? (
        cart.itemInfo.length !== 0 ? (
          <>
            <ItemsTable cart={cart} />
            <OrderForm />
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
