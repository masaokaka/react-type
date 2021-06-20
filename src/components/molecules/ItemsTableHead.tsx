import { TableCell, TableHead, TableRow } from "@material-ui/core";

interface Props {
  heads: { text: string; col: number }[];
}

export const ItemsTableHead = ({ heads }: Props) => {
  return (
    <TableHead>
      <TableRow>
        {heads.map((head, index) => (
          <TableCell key={index} align="center" colSpan={head.col}>
            {head.text}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
