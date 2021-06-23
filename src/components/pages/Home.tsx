import { Container, Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Items } from "../../components/molecules/Items";
import { useAppSelector } from "../../app/hooks";
import { selectItems } from "../../app/store/item/itemsSlice";
import { SearchForm } from "../molecules/SearchForm";
import { ItemType } from "../../app/store/item/itemsSlice";

export const Home = () => {
  const items = useAppSelector(selectItems);
  const [searchItems, setSearchItems] = useState<ItemType[]>(items);

  useEffect(() => {
    setSearchItems(items);
  }, [items]);

  const search = (word: string) => {
    if (word === "" || word === undefined) {
      setSearchItems(items);
    } else {
      let newItems = items!.filter((item) => item.name!.indexOf(word) >= 0);
      setSearchItems(newItems);
    }
  };
  return (
    <Container maxWidth="xl">
      <Box m={3} textAlign="right">
        <SearchForm search={search} />
      </Box>
      <Box>
        <Items items={searchItems!} />
      </Box>
    </Container>
  );
};
