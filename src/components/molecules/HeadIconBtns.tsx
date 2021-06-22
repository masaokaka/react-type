import { IconBtn } from "../atoms/IconBtn/IconBtn";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import { selectUser } from "../../app/store/user/userSlice";
import { useAppSelector } from "../../app/hooks";
import { logout } from "../../app/store/user/userOperation";
import { ADMIN_ID } from "../../state/admin";

export const HeadIconBtns = () => {
  const user = useAppSelector(selectUser);
  const history = useHistory();
  return (
    <Box style={{ paddingLeft: "20px" }}>
      {user.uid === ADMIN_ID && (
        <IconBtn icon={"Admin"} onClk={() => history.push("/admin")} />
      )}
      <IconBtn icon={"Cart"} onClk={() => history.push("/cart")} />
      {user.uid && (
        <IconBtn icon={"History"} onClk={() => history.push("/orderhistory")} />
      )}
      {user.uid ? (
        <IconBtn icon={"Logout"} onClk={() => logout()} />
      ) : (
        <IconBtn icon={"Login"} onClk={() => history.push("/login")} />
      )}
    </Box>
  );
};
