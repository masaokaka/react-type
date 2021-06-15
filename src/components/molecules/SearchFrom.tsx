import { Grid, TextField, Container, IconButton } from "@material-ui/core";
import { IconBtn } from "../atoms/IconBtn";
import { TextInput } from "../atoms/TextInput";

export const SearchForm = () => {
  return (
    <Grid>
      <TextInput type="text" label="検索"/>
      <IconBtn icon="Search" />
    </Grid>
  );
};
