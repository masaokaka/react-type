import { TableCell, TableHead, TableRow } from "@material-ui/core";

interface Props {
  headTexts: string[];
}

export const ItemsTableHead = ({ headTexts }: Props) => {
  return (
    <TableHead>
      <TableRow>
        {headTexts.map((text, index) => (
          <TableCell key={index}>{text}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
