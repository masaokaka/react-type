import Button from "@material-ui/core/Button";

interface Props {
  text: string;
  onClk: () => void;
}
export const Btn = ({ text, onClk }: Props) => {
  return (
    <Button variant="contained" onClick={onClk}>
      {text}
    </Button>
  );
};
