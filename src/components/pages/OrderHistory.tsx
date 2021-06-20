import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
import { ItemsTableHead } from "../molecules/ItemsTableHead";
import { selectUser } from "../../app/store/user/userSlice";
import { selectUserInfo } from "../../app/store/userinfo/userinfoSlice";
import { selectOrders } from "../../app/store/order/ordersSlice";
import { selectItems } from "../../app/store/item/itemsSlice";
import { selectToppings } from "../../app/store/topping/toppingsSlice";
import {
  ORDER_STATUS_PAID,
  ORDER_STATUS_UNPAID,
  ORDER_STATUS_UNDELIVERED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_CANCELLED,
} from "../../state/const";

export const OrderHistory = () => {
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectItems);
  const toppings = useAppSelector(selectToppings);
  const orders = useAppSelector(selectOrders);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Container>
      {orders.length !== 0 && (
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <ItemsTableHead
              headTexts={[
                "注文日時",
                "合計金額(税抜)",
                "ステータス",
                "商品情報",
              ]}
            />
            {/* <TableBody>
              {orderInfo.map((order, index) => (
                <TableRow key={index}>
                  <TableCell align="center" colSpan={2}>
                    {timestampToDate(order.orderDate)}
                  </TableCell>
                  <TableCell colSpan={2} align="center">
                    <h3>{order.totalPrice.toLocaleString()}円</h3>
                  </TableCell>
                  <TableCell colSpan={2} align="center">
                    {order.status === ORDER_STATUS_UNPAID && (
                      <div>
                        <h3 style={{ color: "red" }}>未入金</h3>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => statechange(index, order.id)}
                        >
                          注文キャンセル
                        </Button>
                      </div>
                    )}
                    {order.status === ORDER_STATUS_PAID && (
                      <div>
                        <h3 style={{ color: "orange" }}>入金済み</h3>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => statechange(index, order.id)}
                        >
                          注文キャンセル
                        </Button>
                      </div>
                    )}
                    {order.status === ORDER_STATUS_UNDELIVERIED && (
                      <div>
                        <h3 style={{ color: "orange" }}>発送前</h3>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => statechange(index, order.id)}
                        >
                          注文キャンセル
                        </Button>
                      </div>
                    )}
                    {order.status === ORDER_STATUS_DELIVERIED && (
                      <h3 style={{ color: "gray" }}>発送済み</h3>
                    )}
                    {order.status === ORDER_STATUS_CANCELED && (
                      <h3 style={{ color: "gray" }}>キャンセル済み</h3>
                    )}
                  </TableCell>
                  <TableCell>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={2}>
                            商品名
                          </TableCell>
                          <TableCell align="center" colSpan={2}>
                            価格(税抜)/個数
                          </TableCell>
                          <TableCell align="center" colSpan={2}>
                            トッピング
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.itemInfo.map((item, index) =>
                          items.map(
                            (it) =>
                              it.id === item.itemId && (
                                <TableRow key={index} colSpan={6}>
                                  <TableCell
                                    component="th"
                                    scope="items"
                                    align="center"
                                    colSpan={2}
                                  >
                                    <div>
                                      <img
                                        src={it.img}
                                        height="120"
                                        alt="カレー"
                                      />
                                    </div>
                                    <div>{it.name}</div>
                                  </TableCell>
                                  {item.itemSize == 0 ? (
                                    <TableCell align="center" colSpan={2}>
                                      <h4>
                                        {it.mprice.toLocaleString()}円(Mサイズ)
                                        /{item.itemNum}個
                                      </h4>
                                    </TableCell>
                                  ) : (
                                    <TableCell align="center" colSpan={2}>
                                      <h4>
                                        {it.lprice.toLocaleString()}円(Lサイズ)
                                        /{item.itemNum}個
                                      </h4>
                                    </TableCell>
                                  )}
                                  <TableCell align="center" colSpan={2}>
                                    {item.toppings.length !== 0 ? (
                                      <div>
                                        {item.toppings.map((topping, index) =>
                                          toppings.map(
                                            (top) =>
                                              topping.toppingId === top.id && (
                                                <div key={index}>
                                                  <span>{top.name}:</span>
                                                  {topping.toppingSize === 0 ? (
                                                    <span>{top.mprice}円</span>
                                                  ) : (
                                                    <span>{top.lprice}円</span>
                                                  )}
                                                </div>
                                              )
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <div>なし</div>
                                    )}
                                  </TableCell>
                                </TableRow>
                              )
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      )}
      {orders.length === 0 && <h3>注文履歴がありません</h3>}
    </Container>
  );
};
