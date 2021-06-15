import { Select, InputLabel, FormControl, MenuItem } from "@material-ui/core";
import { ToppingType } from "../../app/store/topping/toppingsSlice";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";

interface Top {
  id: number;
  size: number;
}

interface Props {
  topping: ToppingType;
  addedToppings: Top[];
  setAddedToppings: React.Dispatch<React.SetStateAction<Top[]>>;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const SelectForm = ({
  topping,
  addedToppings,
  setAddedToppings,
}: Props) => {
  const classes = useStyles();
  const [size, setSize] = useState(9);
  useEffect(() => {
    //最初は空なので、空だったら他してやる処理を書く。
    let newAddedToppings = addedToppings.map((top) => {
      if (top.id === topping.id) {
        return { id: topping.id, size: size };
      } else {
        return top;
      }
    });
    console.log(newAddedToppings);
    // setAddedToppings(newAddedToppings);
  }, [size]);
  return (
    <FormControl key={topping.id} className={classes.formControl}>
      <InputLabel id={topping.name}>{topping.name}</InputLabel>
      <Select
        labelId={topping.name}
        name={topping.name}
        value={size}
        onChange={(e: any) => setSize(e.target.value)}
      >
        <MenuItem value={9}>量を選択してください</MenuItem>
        <MenuItem value={0}>普通</MenuItem>
        <MenuItem value={1}>多め</MenuItem>
      </Select>
    </FormControl>
  );
};
