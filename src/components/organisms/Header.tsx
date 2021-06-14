import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { IconBtn } from "../atoms/IconBtn";
import { HeadIconBtns } from "../molecules/HeadIconBtns";
import { Logo } from "../atoms/Logo";
import { SearchForm } from "../molecules/SearchFrom";
import { useDispatch } from "react-redux";
import { toggle } from "../../app/store/sidenavSlice";

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
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconBtn icon={"Menu"} onClk={() => dispatch(toggle(true))}></IconBtn>
          <Logo />
          <SearchForm />
          <HeadIconBtns />
        </Toolbar>
      </AppBar>
    </div>
  );
};
