import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { theme } from "../../Colors/color";

const Pricing = () => {
  const DataIstanbul = [
    {
      city: "Moscow, Russia",
      price: "$17,500",
    },
    {
      city: "London, UK",
      price: "$21,500",
    },
    {
      city: "Saint Petersburg, Russia",
      price: "$18,000",
    },
    {
      city: "Berlin, Germany",
      price: "$20,000",
    },
    {
      city: "Madrid, Spain",
      price: "$22,000",
    },
    {
      city: "Barcelona, Spain",
      price: "$22,500",
    },
    {
      city: "Rome, Italy",
      price: "$19,500",
    },
  ];

  const DataLondon = [
    {
      city: "Berlin, Germany",
      price: "$18,000",
    },
    {
      city: "Madrid, Spain",
      price: "$19,000",
    },
    {
      city: "Barcelona, Spain",
      price: "$19,500",
    },
    {
      city: "Rome, Italy",
      price: "$20,000",
    },
    {
      city: "Paris, France",
      price: "$17,500",
    },
    {
      city: "Bucharest, Romania",
      price: "$21,000",
    },
    {
      city: "Paris, France",
      price: "$22,500",
    },
  ];

  const DataBerlin = [
    {
      city: "Madrid, Spain",
      price: "$16,500",
    },
    {
      city: "Barcelona, Spain",
      price: "$17,00",
    },
    {
      city: "Rome, Italy",
      price: "$15,500",
    },
    {
      city: "Paris, France",
      price: "$14,500",
    },
    {
      city: "Bucharest, Romania",
      price: "$18,000",
    },
    {
      city: "Moscow, Russia",
      price: "$17,500",
    },
    {
      city: "London, UK",
      price: "$21,000",
    },
  ];
  return (
    <Box sx={style.paret}>
      <Container sx={{ maxWidth: { lg: "1400px" } }}>
        <Typography sx={style.heading} data-aos="flip-left">
          We Provide Affordable Prices
        </Typography>
        <Typography sx={style.desc} data-aos="flip-left">
          Well educated, intellectual people, especially scientists at all times
          demonstrate considerably.
        </Typography>
        <Grid
          container
          columnSpacing={5}
          rowSpacing={3}
          sx={{ marginTop: "4rem", display: "flex", justifyContent: "center" }}
        >
          <Grid item lg={4} md={6} xs={12} data-aos="zoom-in">
            <Typography sx={style.pkgHeading}>From Istanbul Fly To</Typography>
            {DataIstanbul.map((ite, index) => {
              return (
                <>
                  <Box sx={style.flexBox} key={index}>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontSize: "18px",
                        opacity: 0.7,
                      }}
                    >
                      {ite.city}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontWeight: 600,
                        fontSize: "18px",
                      }}
                    >
                      {ite.price}
                    </Typography>
                  </Box>
                </>
              );
            })}
          </Grid>
          <Grid item lg={4} md={6} xs={12} data-aos="zoom-in">
            <Typography sx={style.pkgHeading}>From London Fly To</Typography>
            {DataLondon.map((ite, index) => {
              return (
                <>
                  <Box sx={style.flexBox} key={index}>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontSize: "18px",
                        opacity: 0.7,
                      }}
                    >
                      {ite.city}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontWeight: 600,
                        fontSize: "18px",
                      }}
                    >
                      {ite.price}
                    </Typography>
                  </Box>
                </>
              );
            })}
          </Grid>
          <Grid item lg={4} md={6} xs={12} data-aos="zoom-in">
            <Typography sx={style.pkgHeading}>From Berlin Fly To</Typography>
            {DataBerlin.map((ite, index) => {
              return (
                <>
                  <Box sx={style.flexBox} key={index}>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontSize: "18px",
                        opacity: 0.7,
                      }}
                    >
                      {ite.city}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        fontWeight: 600,
                        fontSize: "18px",
                      }}
                    >
                      {ite.price}
                    </Typography>
                  </Box>
                </>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
const style = {
  paret: {
    paddingY: "5rem",
  },
  heading: {
    fontSize: { md: "36px", xs: "30px" },
    fontFamily: "poppins",
    opacity: 0.8,
    fontWeight: 700,
    textAlign: "center",
  },
  desc: {
    textAlign: "center",
    opacity: 0.7,
    fontSize: { md: "18px", xs: "16px" },
  },
  pkgHeading: {
    textAlign: "center",
    borderBottom: `2px solid ${theme.secondary}`,
    paddingBottom: "20px",
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: 600,
    fontFamily: "poppins",
    opacity: 0.7,
  },
  flexBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItms: "Center",
    justifyContent: "space-between",
    paddingY: "6px",
    paddingX: "5px",
    transition: "all ease-out 0.2s",
    ":hover": {
      backgroundColor: "#E5E1DA",
    },
  },
};
