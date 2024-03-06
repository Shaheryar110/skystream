import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { theme } from "../../Colors/color";
import logo from "../../Assets/Images/logo.png";
import one from "../../Assets/Images/1.jpg";
import two from "../../Assets/Images/2.jpg";
import three from "../../Assets/Images/3.jpg";
import four from "../../Assets/Images/4.jpg";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <>
      <Box sx={style.box}>
        <Container sx={{ maxWidth: { lg: "1400px" } }}>
          <Grid container columnSpacing={5} xs={{ height: "100%" }}>
            <Grid
              item
              lg={3}
              sx={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={logo} style={{ width: "250px", height: "auto" }} />
              {/* <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                LOGO
              </Typography> */}
            </Grid>
            <Grid item lg={6}>
              <Typography sx={style.heads}>ABOUT TRAVELISTA</Typography>
              <Typography sx={style.desc}>
                Introducing Skystream Charters, the best option for private jet
                sharing that combines unmatched service, efficiency, and
                elegance. At Skystream Charters, we're committed to providing a
                first-rate, accessible, and exclusive air travel experience. Our
                fleet of cutting-edge aircraft is designed to meet the diverse
                needs of our discriminating customers by providing a smooth
                blend of privacy, speed, and luxury. Our versatile jet sharing
                approach guarantees that you may take advantage of the
                advantages of private jet travel at a fraction of the price,
                whether you're flying for business, pleasure, or anything in
                between. Come along with us as we reinvent the sky with our
                dedication to quality, security, and individualized service.
                Welcome to Skystream Charters, a place where travel goes
                beyond the typical.
              </Typography>
            </Grid>
            <Grid item lg={3}>
              <Typography sx={style.heads}>NAVIAGTION LINKS</Typography>
              <Typography sx={style.desc}>Home</Typography>
              <Typography sx={style.desc}>Customer</Typography>
              <Typography sx={style.desc}>Administrator</Typography>
            </Grid>
            {/* <Grid item lg={3} xs={12}>
              <Typography sx={style.heads}>INSTAFEED</Typography>
              <Grid container sx={{ width: "100%" }} spacing={2}>
                <Grid item lg={3}>
                  <img
                    src={one}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "10px",
                    }}
                  />
                </Grid>
                <Grid item lg={3}>
                  <img
                    src={two}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "10px",
                    }}
                  />
                </Grid>
                <Grid item lg={3}>
                  <img
                    src={three}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "10px",
                    }}
                  />
                </Grid>
                <Grid item lg={3}>
                  <img
                    src={four}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "10px",
                    }}
                  />
                </Grid>
                <Grid item lg={3}>
                  <img
                    src={one}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "10px",
                    }}
                  />
                </Grid>
                <Grid item lg={3}>
                  <img
                    src={two}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "10px",
                    }}
                  />
                </Grid>
                <Grid item lg={3}>
                  <img
                    src={three}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "10px",
                    }}
                  />
                </Grid>
                <Grid item lg={3}>
                  <img
                    src={four}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "10px",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
          <hr />
          <Box sx={style.copright}>
            <Typography sx={style.desc}>
              Copyright ©2024 All rights reserved |
            </Typography>
            <Box sx={style.flex}>
              <FacebookIcon sx={style.icon} />
              <LinkedInIcon sx={style.icon} />
              <InstagramIcon sx={style.icon} />
              <TwitterIcon sx={style.icon} />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
const style = {
  box: {
    paddingTop: "8rem",
    backgroundColor: theme.secondary,
    paddingBottom: "2rem",
  },
  heads: {
    color: "white",
    fontWeight: 600,
    fontSize: "22px",
    fontFamily: "poppins",
    paddingBottom: "14px",
    letterSpacing: "1px",
  },
  desc: {
    fontFamily: "poppins",
    color: "white",
    opacity: 0.7,
    transition: "all ease-out 0.2s",
    paddingBottom: "10px",
    cursor: "pointer",
    ":hover": {
      opacity: 0.9,
    },
  },
  copright: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "10px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center",
  },
  icon: {
    color: "white",
    transition: "all ease-out 0.3s",
    ":hover": {
      opacity: 0.7,
    },
  },
};
