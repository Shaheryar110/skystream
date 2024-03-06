import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Typography } from "@mui/material";
export const DrawerList = ({ onClick }) => {
  const navItem = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon sx={{ color: "inherit" }} />,
    },
    {
      name: "Customers",
      link: "/Customers",
      icon: <AssignmentIndIcon sx={{ color: "inherit" }} />,
    },
    {
      name: "Admin",
      link: "/Aircrafts",
      icon: <AdminPanelSettingsIcon sx={{ color: "inherit" }} />,
    },
  ];
  return (
    <>
      <Box sx={{ width: 250 }} role="presentation" onClick={onClick}>
        <Typography sx={style.logo}>LOGO</Typography>
        <List sx={{ color: "white" }}>
          {navItem.map((text, index) => (
            <ListItem sx={{ color: "inherit" }} key={index} disablePadding>
              <ListItemButton sx={{ color: "inherit" }}>
                <ListItemIcon sx={{ color: "inherit" }}>
                  {text.icon}
                </ListItemIcon>
                <Link
                  to={text.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary={text.name} sx={{ color: "white" }} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};
const style = {
  logo: {
    fontWeight: 700,
    textAlign: "center",
    paddingY: "3rem",
    color: "white",
    fonFamily: "poppins",
    fontSize: 30,
  },
};
