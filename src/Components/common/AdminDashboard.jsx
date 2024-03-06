import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { CiLogout } from "react-icons/ci";
import { GiAntiAircraftGun } from "react-icons/gi";
import { MdLocalAirport } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";
import { GrView } from "react-icons/gr";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const drawerWidth = 240;

function AdminDashboard({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { setAdmin } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("admin", false);
    const value = localStorage.getItem("admin") === "true";
    console.log(value, "value");
    setAdmin(value);
    navigate("/");
  };
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
  const navItem = [
    {
      name: "Aircraft",
      link: "/Aircrafts",
      icon: <GiAntiAircraftGun />,
    },
    {
      name: "Airports",
      link: "/Airports",
      icon: <MdLocalAirport />,
    },
    {
      name: "Add Flights",
      link: "/AddFlights",
      icon: <MdAddCircleOutline />,
    },
    {
      name: "View Booked Flights",
      link: "/book-flights-admin",
      icon: <GrView />,
    },
    {
      name: "View Flights",
      link: "/ViewFlights",
      icon: <GrView />,
    },
    {
      name: "View Leads",
      link: "/Leads",
      icon: <GrView />,
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
          <ListItem
            key={text}
            disablePadding
            onClick={() => navigate(text.link)}
          >
            <ListItemButton>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.name} sx={styles.font} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={styles.flex}>
        <List>
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <CiLogout />
              </ListItemIcon>
              <ListItemText primary={"Logout"} sx={styles.font} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

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

AdminDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default AdminDashboard;
const styles = {
  flex: {
    // position: "absolute",
    // bottom: 250,
    width: "100%",
  },
  font: {
    fontFamily: "'Poppins'",
  },
};
