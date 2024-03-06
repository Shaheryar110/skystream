import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeckIcon from "@mui/icons-material/Deck";
import { theme } from "../../Colors/color";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import toast from "react-hot-toast";
import { AddContactForm } from "../../Services/AddData";
const initial = {
  name: "",
  address: "",
  subject: "",
  message: "",
};
const ConatctUs = () => {
  const [form, setForm] = useState(initial);
  const onChange = (key, val) => {
    setForm((prev) => ({
      ...prev,
      [key]: val,
    }));
  };
  const onSubmit = () => {
    const { name, address, message, subject } = form;
    if (name !== "" && address !== "" && message !== "" && subject !== "") {
      AddContactForm(form)
        .then(() => {
          toast.success("Form Added");
          setForm(initial);
        })
        .catch((err) => {
          toast.error("Something went Wrong");
        });
    } else {
      toast.error("Please Fill All Feilds");
    }
  };
  return (
    <>
      <Box sx={style.paret} data-aos="fade-up" data-aos-duration="1000">
        <Container sx={{ maxWidth: { lg: "1400px" } }}>
          <Typography sx={style.heading}>Conatct Us</Typography>
          <Grid container columnSpacing={5} sx={{ marginTop: "5rem" }}>
            <Grid
              item
              lg={4}
              xs={12}
              sx={{
                display: { lg: "block", xs: "flex" },
                justifyContent: "center",
                alignItems: "center",
                flexDirection: { md: "row", xs: "column" },
                gap: { md: 10, xs: 5 },
              }}
            >
              <Box sx={style.addressBox}>
                <DeckIcon sx={{ color: theme.secondary, fontSize: 50 }} />
                <Box>
                  <Typography sx={style.main}>Binghamton, New York</Typography>
                  <Typography sx={style.mini}>
                    123 Hinkle Deegan Lake Road
                  </Typography>
                </Box>
              </Box>
              <Box sx={style.addressBox}>
                <LocalPhoneIcon sx={{ color: theme.secondary, fontSize: 50 }} />
                <Box>
                  <Typography sx={style.main}>00 (958) 9865 562</Typography>
                  <Typography sx={style.mini}>
                    Mon to Fri 9am to 6 pm
                  </Typography>
                </Box>
              </Box>
              <Box sx={style.addressBox}>
                <MarkunreadIcon sx={{ color: theme.secondary, fontSize: 50 }} />
                <Box>
                  <Typography sx={style.main}>support@xyz.com</Typography>
                  <Typography sx={style.mini}>
                    Send us your query anytime!
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <TextField
                label="Enter Your Name"
                variant="outlined"
                sx={{ marginBottom: "15px", width: "100%" }}
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
              />
              <TextField
                label="Enter Your Address"
                variant="outlined"
                sx={{ marginBottom: "15px", width: "100%" }}
                value={form.address}
                onChange={(e) => onChange("address", e.target.value)}
              />
              <TextField
                label="Enter Your Subject"
                variant="outlined"
                sx={{ marginBottom: "15px", width: "100%" }}
                value={form.subject}
                onChange={(e) => onChange("subject", e.target.value)}
              />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
              sx={{
                display: "flex",
                alignItems: "end",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Message"
                multiline
                rows={7}
                defaultValue="Enter Message"
                style={{ width: "100%" }}
                value={form.message}
                onChange={(e) => onChange("message", e.target.value)}
              />
              <Button variant="contained" sx={style.btn} onClick={onSubmit}>
                SEND MESSAGE
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ConatctUs;
const style = {
  paret: {
    paddingY: "5rem",
  },
  heading: {
    fontSize: "36px",
    fontFamily: "poppins",
    opacity: 0.8,
    fontWeight: 700,
    textAlign: "center",
  },
  addressBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    gap: "20px",
    marginBottom: "40px",
  },
  main: {
    fontFamily: "poppins",
    opacity: 0.8,
    fontSize: "19px",
    fontWeight: 600,
    color: theme.secondary,
  },
  mini: {
    color: theme.secondary,
    fontFamily: "poppins",
    opacity: 0.6,
    fontSize: "17px",
  },
  btn: {
    fontWeight: 600,
    fontSize: 15,
    paddingX: "20px",
    paddingY: "10px",
    fontFamily: "Poppins",
    marginTop: "1rem",
  },
};
