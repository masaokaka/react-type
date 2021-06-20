import Container from "@material-ui/core/Container";
import { Items } from "../../components/molecules/Items";
import { useAppSelector } from "../../app/hooks";
import { selectItems } from "../../app/store/item/itemsSlice";
import { SearchForm } from "../molecules/SearchFrom";

export const Home = () => {
  const items = useAppSelector(selectItems);
  return (
    <Container>
      <SearchForm />
      <Items items={items} />
    </Container>
  );
};
