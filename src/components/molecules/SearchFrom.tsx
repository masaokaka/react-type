import { Grid } from "@material-ui/core";
import { IconBtn } from "../atoms/IconBtn";
import { TextInput } from "../atoms/TextInput";

export const SearchForm = () => {
  const search = () => {
    console.log("検索");
  };
  return (
    <Grid>
      <TextInput type="text" label="検索" />
      <IconBtn icon="Search" onClk={() => search()} />
    </Grid>
  );
};
