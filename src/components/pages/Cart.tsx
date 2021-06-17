import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { selectCart } from "../../app/store/cart/cartSlice";
import { selectUser } from "../../app/store/user/userSlice";
import { fetchCart } from "../../app/store/cart/cartOperation";
import { Container } from "@material-ui/core";

export const Cart = () => {
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.uid !== null) {
      dispatch(fetchCart(user.uid));
    }
  }, []);
  return (
    <Container>
      <h2>カート</h2>
      {cart.itemInfo ? (
        cart.itemInfo!.map((item) => (
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.itemId}</p>
            <p>{item.itemNum}</p>
            <p>{item.itemSize}</p>
          </div>
        ))
      ) : (
        <div>商品がありません</div>
      )}
    </Container>
  );
};
