import Container from "@material-ui/core/Container";
import { Items } from "../../components/molecules/Items";
import { useAppSelector } from "../../app/hooks";
import { selectItems } from "../../app/store/item/itemsSlice";

export const Home = () => {
  const items = useAppSelector(selectItems);
  return (
    <Container>
      <Items items={items} />
    </Container>
  );
};
