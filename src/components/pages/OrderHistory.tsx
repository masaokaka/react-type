import { useAppSelector } from "../../app/hooks";
import { OrderItemsTable } from "../organisms/OrderItemsTable";
import { Container } from "@material-ui/core";
import { selectOrders } from "../../app/store/order/ordersSlice";

export const OrderHistory = () => {
  const orders = useAppSelector(selectOrders);
  return (
    <Container>
      <h2>注文履歴</h2>
      {orders.length !== 0 ? (
        <OrderItemsTable orders={orders} />
      ) : (
        <h3>注文履歴がありません</h3>
      )}
    </Container>
  );
};
