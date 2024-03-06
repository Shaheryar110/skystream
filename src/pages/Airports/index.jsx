import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import bg from "../../Assets/Images/bg.jpeg";
import { theme } from "../../Colors/color";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AdminLogin, LoginFirebase } from "../../Services/Authentication";
import AdminDashboard from "../../Components/common/AdminDashboard";
import { AddAirport } from "../../Services/AddData";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
  });

  const handleOnChange = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };
  const onSubmit = async () => {
    const { country, name } = formData;
    if (country === "" || name === "") {
      toast.error("Fill All Feilds");
      return;
    }
    try {
      const { res } = await AddAirport(formData);
      if (res === true) {
        toast.success("Add Airport successfully");
        setFormData({
          name: "",
          country: "",
        });
      } else {
        toast.error("Add Airport Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AdminDashboard>
        <Box sx={style.bg}>
          <Box sx={style.LoginBox}>
            <Typography sx={style.heading}>Add Airport</Typography>
            <div class="section">
              <input
                className="input"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(e) => handleOnChange("name", e.target.value)}
                placeholder="Airport Name"
                required
              />
              <label class="label" html="name">
                Airport Name
              </label>
              <div class="error"></div>
            </div>

            <div class="section">
              <input
                className="input"
                name="country"
                id="country"
                value={formData.country}
                onChange={(e) => handleOnChange("country", e.target.value)}
                type="text"
                placeholder="Country"
                required
              />
              <label class="label" html="name">
                Country
              </label>
              <div class="error"></div>
            </div>

            {/* <div class="section">
            <input
              className="input"
              name="city"
              id="city"
              value={formData.city}
              onChange={(e) => handleOnChange("city", e.target.value)}
              type="text"
              placeholder="City"
              required
            />
            <label class="label" html="name">
            City
            </label>
            <div class="error"></div>
          </div> */}
            <Button variant="contained" sx={style.btn} onClick={onSubmit}>
              ADD
            </Button>
          </Box>
        </Box>
      </AdminDashboard>
    </>
  );
};

export default Index;
const style = {
  bg: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundImage: `url(${bg})`,
  },
  LoginBox: {
    // height: "50%",
    width: { lg: "40%", md: "40%", sm: "80%", xs: "100%" },
    borderRadius: "1rem",
    padding: "1.3rem",
    background: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  container: {
    maxWidth: { lg: "1400px" },
    height: "919px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  heading: {
    width: "100%",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: 600,
    color: "white",
    fontFamily: "poppins",
    paddingBottom: "25px",
    opacity: 0.7,
  },
  btn: {
    fontWeight: 600,
    fontSize: 15,
    paddingX: "20px",
    paddingY: "10px",
    fontFamily: "Poppins",
    marginTop: "1rem",
    background: theme.secondary,
  },
};
