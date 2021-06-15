import TextField from "@material-ui/core/TextField";
interface Props {
  type: string;
  label: string;
}

export const TextInput = ({type,label}:Props) => {
  return (
    <TextField
      type={type}
      variant="filled"
      size="small"
      label={label}
    ></TextField>
  );
};
