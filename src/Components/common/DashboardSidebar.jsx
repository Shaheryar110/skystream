import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { CiLogout } from "react-icons/ci";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/Config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

function ResponsiveDrawer({ children }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const navItem = [
    {
      name: "Available Flights",
      link: "/Customers",
      icon: <HomeIcon sx={{ color: "inherit" }} />,
    },
    {
      name: "Booked Flights",
      link: "/book-flights",
      icon: <AssignmentIndIcon sx={{ color: "inherit" }} />,
    },
  ];
  const drawer = (
    <div>
      <Typography
        sx={{
          fontWeight: 700,
          textAlign: "center",
          paddingY: "3rem",
          color: "black",
          fonFamily: "poppins",
          fontSize: 30,
        }}
      >
        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
          LOGO
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItem.map((text, index) => (
          <Link
            to={text.link}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <Box sx={{ width: "100%" }}>
          <List>
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <CiLogout />
                </ListItemIcon>
                <ListItemText
                  primary={"Logout"}
                  sx={{ fontFamily: "poppins" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </List>
    </div>
  );
  const { currentUser } = React.useContext(AuthContext);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ textTransform: "uppercase" }}
          >
            {currentUser ? `Welcome! ${currentUser.displayName}` : "Welcome"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
