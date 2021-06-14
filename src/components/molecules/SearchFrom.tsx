import { Grid, TextField, Container, IconButton } from "@material-ui/core";
import { IconBtn } from "../atoms/IconBtn";
import { TextInput } from "../atoms/TextInput";

export const SearchForm = () => {
  return (
    <Grid>
      <TextInput />
      <IconBtn icon="Search" />
    </Grid>
  );
};
