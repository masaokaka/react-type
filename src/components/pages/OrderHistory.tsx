import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrderItemsTable } from "../organisms/OrderItemsTable";
import { Container } from "@material-ui/core";
import { selectOrders, unsetOrders } from "../../app/store/order/ordersSlice";
import { fetchOrders } from "../../app/store/order/ordersOperation";
import { selectUser } from "../../app/store/user/userSlice";
import { selectItems } from "../../app/store/item/itemsSlice";

export const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useAppSelector(selectOrders);
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectItems);
  useEffect(() => {
    dispatch(unsetOrders());
    dispatch(fetchOrders(user.uid!));
    return () => {
      dispatch(unsetOrders());
    };
  }, []);
  return (
    <Container>
      <h2>注文履歴</h2>
      {orders.length !== 0 &&
        (user.uid ? (
          <OrderItemsTable items={items} orders={orders} uid={user.uid} />
        ) : (
          <h3>注文履歴がありません</h3>
        ))}
    </Container>
  );
};
