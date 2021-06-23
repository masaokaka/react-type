import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { IconBtn } from "../atoms/IconBtn";
import { HeadIconBtns } from "../molecules/HeadIconBtns";
import { Logo } from "../atoms/Logo";
import { useDispatch } from "react-redux";
import { toggle } from "../../app/store/sidenavSlice";
import { useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../../app/store/userinfo/userinfoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    padding: theme.spacing(1, 1),
    backgroundColor: "orange",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userInfo = useAppSelector(selectUserInfo);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconBtn icon={"Menu"} onClk={() => dispatch(toggle(true))}></IconBtn>
          <Logo />
          {userInfo.username && <p>ようこそ{userInfo.username}さん</p>}
          <HeadIconBtns uid={userInfo.uid} />
        </Toolbar>
      </AppBar>
    </div>
  );
};
