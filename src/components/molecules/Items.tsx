import { Item } from "../atoms/Item/Item";
import Box from "@material-ui/core/Box";
import { ItemType } from "../../app/store/item/itemsSlice";

interface Props {
  items: ItemType[];
}

export const Items = ({ items }: Props) => {
  return (
    <Box display="flex" flexWrap="wrap">
      {items.length === 0 ? (
        <h3>該当する商品はありません</h3>
      ) : (
        items.map((item, index) => <Item item={item} key={index} />)
      )}
    </Box>
  );
};
