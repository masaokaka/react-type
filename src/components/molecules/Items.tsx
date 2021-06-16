import { Item } from "../atoms/Item";
import Box from "@material-ui/core/Box";
import { ItemType } from "../../app/store/item/itemsSlice";

interface Props {
  items: ItemType[];
}

export const Items = ({ items }: Props) => {
  return (
    <Box display="flex" flexWrap="wrap">
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </Box>
  );
};
