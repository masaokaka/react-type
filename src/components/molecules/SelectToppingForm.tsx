import { Container } from "@material-ui/core";
import { selectToppings } from "../../app/store/topping/toppingsSlice";
import { useAppSelector } from "../../app/hooks";
import { SelectForm } from "../atoms/SelectForm";

interface Top {
  id: number;
  size: number;
}

interface Props {
  addedToppings: Top[];
  setAddedToppings: React.Dispatch<React.SetStateAction<Top[]>>;
}

export const SelectToppingForm = ({
  addedToppings,
  setAddedToppings,
}: Props) => {
  const toppings = useAppSelector(selectToppings);
  return (
    <Container>
      {toppings.map((topping) => (
        <SelectForm
          topping={topping}
          addedToppings={addedToppings}
          setAddedToppings={setAddedToppings}
          key={topping.id}
        />
      ))}
    </Container>
  );
};
