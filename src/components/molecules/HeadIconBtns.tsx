import { IconBtn } from "../atoms/IconBtn";
import Box from "@material-ui/core/Box";

interface Props {
  Icon: string;
  route?: string;
  func?: () => void;
}

export const HeadIconBtns = () => {
  return (
    <Box style={{ paddingLeft: "20px" }}>
      <IconBtn icon={"Admin"} />
      <IconBtn icon={"History"} />
      <IconBtn icon={"Login"} />
      <IconBtn icon={"Logout"} />
    </Box>
  );
};
