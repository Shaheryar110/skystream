import { Avatar, Box, Container, Drawer, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import logo from "../../Assets/Images/logo.png";
import { theme } from "../../Colors/color";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Config";
import toast from "react-hot-toast";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerList } from "./DrawerList";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [isShow, setisShow] = useState(false);
  const [user, setUser] = useState();
  const redirection = () => {};
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  const showPopup = () => {
    setisShow(!isShow);
  };
  const Logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign Out SuccessFully");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
  return (
    <Box sx={[style.header, { top: scrolled && 0 }]}>
      <Container
        sx={[
          {
            maxWidth: { lg: "1400px" },
            background: scrolled
              ? theme.secondary
              : "rgba(255, 255, 255, 0.15)",
          },
          style.mainMenu,
        ]}
      >
        <Box sx={style.row}>
          <Box sx={style.logoBox}>
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              <img src={logo} style={{ width: "100px", height: "auto" }} />
            </Link>
            {/* <Typography
              sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
            >
              LOGO
            </Typography> */}
          </Box>
          <Box sx={style.nav}>
            <Typography sx={style.color}>
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Home
              </Link>{" "}
            </Typography>
            <Typography sx={style.color}>
              <Link
                to={"/Customers"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Customer
              </Link>
            </Typography>
            <Typography sx={style.color}>
              <Link
                to={"/Aircrafts"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Administrator
              </Link>
            </Typography>
            {/* {user ? (
              <Box sx={{ position: "relative" }}>
                <Avatar
                  alt={user.displayName}
                  src={user.displayName}
                  onClick={() => showPopup()}
                  sx={{ width: 36, height: 36, cursor: "pointer" }}
                />
                {isShow && (
                  <Box
                    sx={{
                      width: "130px",
                      height: "50px",
                      borderRadius: "10px",
                      position: "absolute",
                      background: "white",
                      boxShadow: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      top: "110%",
                    }}
                  >
                    <Typography
                      onClick={() => Logout()}
                      sx={[{ color: "black !important" }, style.color]}
                    >
                      Logout
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : (
              <>
                <Typography onClick={() => redirection()} sx={style.color}>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/Login"
                  >
                    Login/SignUp
                  </Link>
                </Typography>
              </>
            )} */}
          </Box>
          <Box sx={style.mobileMenu} onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ color: "white", fontSize: 25 }} />
          </Box>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <DrawerList onClick={toggleDrawer(false)} />
          </Drawer>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
const style = {
  header: {
    position: "fixed",
    left: 0,
    top: 30,
    right: 0,
    transition: "all 0.5s",
    zIndex: 997,
  },
  mainMenu: {
    paddingBottom: "20px",
    paddingTop: "20px",
    // background: "rgba(255, 255, 255, 0.15)",
    paddingLeft: { sm: "15px", xs: 1 },
    paddingRight: { sm: "15px", xs: 1 },
    transition: "all ease-out 0.3s",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoBox: {
    paddingLeft: "15px",
  },
  nav: {
    paddingRight: "15px",
    display: { sm: "flex", xs: "none" },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  mobileMenu: {
    paddingRight: "15px",
    display: { sm: "none", xs: "flex" },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "end",
    gap: "20px",
  },
  color: {
    color: "white",
    fontFamily: "Poppins",
    cursor: "pointer",
    transition: "all ease-out 0.5s",
    ":hover": {
      color: theme.secondary,
    },
  },
};
