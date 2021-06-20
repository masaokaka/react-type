import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { OrderType } from "../../app/store/order/ordersSlice";
import { ItemsTableHead } from "../molecules/ItemsTableHead";
import { OrderItemsTableRow } from "../molecules/OrderItemsTableRow";

interface Props {
  orders: OrderType[];
}
export const OrderItemsTable = ({ orders }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "注文日時", col: 2 },
            { text: "合計金額(税抜)", col: 2 },
            { text: "ステータス", col: 2 },
            { text: "商品情報", col: 8 },
          ]}
        />
        <TableBody>
          {orders.map((order, index) => (
            <OrderItemsTableRow key={index} order={order} orders={orders} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
