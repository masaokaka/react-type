import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HistoryIcon from "@material-ui/icons/History";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface Props {
  icon: string;
  onClk?: () => void;
}

export const IconBtn = ({ icon, onClk }: Props) => {
  return (
    <IconButton onClick={onClk}>
      {icon === "Menu" && <MenuIcon />}
      {icon === "Admin" && <SupervisorAccountIcon />}
      {icon === "Cart" && <ShoppingCartIcon />}
      {icon === "History" && <HistoryIcon />}
      {icon === "Login" && <MeetingRoomIcon />}
      {icon === "Logout" && <MeetingRoomOutlinedIcon />}
      {icon === "Search" && <SearchIcon />}
      {icon === "Arrow" && <ArrowBackIcon />}
    </IconButton>
  );
};
