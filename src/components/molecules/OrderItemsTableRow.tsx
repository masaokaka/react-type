import { Table, TableCell, TableRow, TableBody } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { Btn } from "../atoms/Btn";
import { timestampToDate } from "../../utils/functions";
import { Price } from "../atoms/Price";
import { ItemsTableHead } from "./ItemsTableHead";
import { selectUser } from "../../app/store/user/userSlice";
import { OrderType } from "../../app/store/order/ordersSlice";
import {
  ORDER_STATUS_UNPAID,
  ORDER_STATUS_PAID,
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_UNDELIVERED,
} from "../../state/const";
import { CartItemsTableRow } from "./CartItemsTableRow";
import { updateOrderStatus } from "../../app/store/order/ordersOperation";

interface Props {
  order: OrderType;
  orders: OrderType[];
}
export const OrderItemsTableRow = ({ order, orders }: Props) => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const cancelStatus = (orderId: string) => {
    if (window.confirm("注文をキャンセルしますか?")) {
      dispatch(
        updateOrderStatus(user.uid!, orders, orderId, ORDER_STATUS_CANCELLED)
      );
    }
  };
  return (
    <TableRow>
      <TableCell colSpan={2} align="center">
        {timestampToDate(order.timestamp!)}
      </TableCell>
      <TableCell colSpan={2} align="center">
        <Price price={order.totalPrice!} tax={false} bigsize={false} />
      </TableCell>
      <TableCell colSpan={2} align="center">
        {order.status === ORDER_STATUS_UNPAID && (
          <h3 style={{ color: "red" }}>未入金</h3>
        )}
        {order.status === ORDER_STATUS_PAID && (
          <h3 style={{ color: "orange" }}>入金済み</h3>
        )}
        {order.status === ORDER_STATUS_UNDELIVERED && (
          <h3 style={{ color: "orange" }}>発送前</h3>
        )}
        {order.status === ORDER_STATUS_DELIVERED && (
          <h3 style={{ color: "gray" }}>発送済み</h3>
        )}
        {order.status === ORDER_STATUS_CANCELLED && (
          <h3 style={{ color: "gray" }}>キャンセル済み</h3>
        )}
        {order.status! <= ORDER_STATUS_UNDELIVERED && (
          <Btn text="注文キャンセル" onClk={() => cancelStatus(order.id!)} />
        )}
      </TableCell>
      <TableCell colSpan={6}>
        <Table>
          <ItemsTableHead
            heads={[
              { text: "商品名", col: 2 },
              { text: "価格(税抜き)", col: 2 },
              { text: "数量", col: 2 },
              { text: "トッピング", col: 2 },
            ]}
          />
          <TableBody>
            {order.itemInfo !== undefined &&
              order.itemInfo.map((item, index) => (
                <CartItemsTableRow
                  key={index}
                  cart={order}
                  cartItem={item}
                  show={true}
                  status={order.status!}
                />
              ))}
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  );
};
