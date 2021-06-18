import {
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export const ItemsTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center"></TableCell>
        <TableCell align="center">商品名</TableCell>
        <TableCell align="center">価格(税抜)</TableCell>
        <TableCell align="center">個数</TableCell>
        <TableCell align="center">トッピング：価格(税抜)</TableCell>
        <TableCell align="center"></TableCell>
      </TableRow>
    </TableHead>
  );
};
