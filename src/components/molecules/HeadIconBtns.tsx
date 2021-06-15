import { IconBtn } from "../atoms/IconBtn";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";

export const HeadIconBtns = () => {
  const history = useHistory();
  const handleLink = (path: string): void => history.push(path);
  return (
    <Box style={{ paddingLeft: "20px" }}>
      <IconBtn icon={"Admin"} />
      <IconBtn icon={"History"} onClk={() => handleLink("/orderhistory")} />
      <IconBtn icon={"Login"} onClk={() => handleLink("/login")} />
      <IconBtn icon={"Logout"} />
    </Box>
  );
};
