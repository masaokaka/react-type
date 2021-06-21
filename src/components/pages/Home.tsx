import Container from "@material-ui/core/Container";
import { useState, useEffect } from "react";
import { Items } from "../../components/molecules/Items";
import { useAppSelector } from "../../app/hooks";
import { selectItems } from "../../app/store/item/itemsSlice";
import { SearchForm } from "../molecules/SearchFrom";
import { ItemType } from "../../app/store/item/itemsSlice";

export const Home = () => {
  const items = useAppSelector(selectItems);
  const [searchItems, setSearchItems] = useState<ItemType[]>(items);

  useEffect(() => {
    setSearchItems(items);
  }, [items]);
  const search = (word: string) => {
    if (word === "") {
      setSearchItems(items);
    } else {
      let newItems = searchItems!.filter(
        (item) => item.name!.indexOf(word) >= 0
      );
      setSearchItems(newItems);
    }
  };
  return (
    <Container>
      <SearchForm search={search} />
      <Items items={searchItems!} />
    </Container>
  );
};
