import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { CartType } from "../../app/store/cart/cartSlice";
import { selectItems } from "../../app/store/item/itemsSlice";
import { ItemsTableHead } from "../molecules/ItemsTableHead";
import { ItemsTableRow } from "../molecules/ItemsTableRow";

interface Props {
  cart: CartType;
  show: boolean;
}
export const ItemsTable = ({ cart, show }: Props) => {
  const items = useAppSelector(selectItems);
  return (
    <TableContainer component={Paper}>
      <Table>
        <ItemsTableHead
          headTexts={[
            "",
            "商品名",
            "価格(税抜)",
            "個数",
            "トッピング：価格(税抜)",
            "",
          ]}
        />
        <TableBody>
          {cart.itemInfo!.map((cartItem, index) =>
            items.map(
              (item) =>
                item.id === cartItem.itemId && (
                  <ItemsTableRow
                    key={index}
                    cart={cart}
                    cartItem={cartItem}
                    show={show}
                  />
                )
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
