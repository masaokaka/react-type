import { Grid } from "@material-ui/core";
import { useState } from "react";
import { SetStateAction } from "react";
import { IconBtn } from "../atoms/IconBtn";
import { TextField } from "@material-ui/core";

interface Props {
  search: (word: string) => void;
}
export const SearchForm = ({ search }: Props) => {
  const [word, setWord] = useState<string>();
  return (
    <Grid>
      <TextField
        type="text"
        variant="filled"
        size="small"
        label="検索"
        onChange={(e) => setWord(e.target.value)}
      />
      <IconBtn icon="Search" onClk={() => search(word!)} />
    </Grid>
  );
};
