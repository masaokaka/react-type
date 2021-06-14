import { Item } from "../atoms/Item";
import Box from "@material-ui/core/Box";

export const Items = () => {
  return (
    <Box display="flex" flexWrap="wrap">
      <Item />
    </Box>
  );
};
