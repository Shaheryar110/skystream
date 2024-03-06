import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import bg from "../../Assets/Images/bg.jpeg";
import { Link } from "react-router-dom";
import { SignUpFirebase, signInGoogle } from "../../Services/Authentication";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { theme } from "../../Colors/color";
import { FcGoogle } from "react-icons/fc";

const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleOnChange = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const onSubmit = async () => {
    const { name, email, phone, password, confirmPassword } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const capitalLetterRegex = /[A-Z]/;
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Fill All Fields");
      return;
    }
    if (password.length > 8 && !capitalLetterRegex.test(password)) {
      toast.error("Password must include Capital Letter");
      return;
    }

    if (
      !emailPattern.test(email) ||
      password !== confirmPassword ||
      confirmPassword.length < 8
    ) {
      toast.error("Validation Error");
    } else {
      try {
        const { res } = await SignUpFirebase(formData);
        if (res === true) {
          toast.success("Signup Successful");
          navigate("/Customers");
        } else if (res === false) {
          toast.error("Already Registered");
        }
      } catch (error) {
        console.error(error, "error");
      }
    }
  };
  const signupGoogle = () => {
    signInGoogle().then((data) => {
      console.log(data, "ddata");
      toast.success("Login Successfull");
      navigate("/Customers");
    });
  };

  return (
    <>
      <Box sx={style.bg}>
        <Box sx={style.LoginBox}>
          <Typography sx={style.heading}>Sign Up</Typography>
          <div class="section">
            <input
              className="input"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) => handleOnChange("name", e.target.value)}
              type="text"
              placeholder="Enter Your Full Name"
              required
            />
            <label class="label" html="name">
              Enter Your Full Name
            </label>
            <div class="error"></div>
          </div>

          <div class="section">
            <input
              className="input"
              name="name"
              id="name"
              value={formData.email}
              onChange={(e) => handleOnChange("email", e.target.value)}
              type="email"
              placeholder="Enter Your Email"
              required
            />
            <label class="label" html="name">
              Enter Your Email"
            </label>
            <div class="error"></div>
          </div>

          <div class="section">
            <input
              className="input"
              name="name"
              id="name"
              value={formData.phone}
              onChange={(e) => handleOnChange("phone", e.target.value)}
              type="text"
              placeholder="Enter Your Phone"
              required
            />
            <label class="label" html="name">
              Enter Your Phone
            </label>
            <div class="error"></div>
          </div>

          <div class="section">
            <input
              className="input"
              name="name"
              id="name"
              value={formData.password}
              onChange={(e) => handleOnChange("password", e.target.value)}
              type="password"
              placeholder="Enter Your Password"
              required
            />
            <label class="label" html="name">
              Enter Your Password
            </label>
            <div class="error"></div>
          </div>

          <div class="section">
            <input
              className="input"
              name="name"
              id="name"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleOnChange("confirmPassword", e.target.value)
              }
              type="password"
              placeholder="Confirm Password"
              required
            />
            <label class="label" html="name">
              Confirm Password
            </label>
            <div class="error"></div>
          </div>

          <Button variant="contained" sx={style.btn} onClick={onSubmit}>
            Register
          </Button>
          <Typography sx={style.slogan}>
            Already have an account?
            <Link
              to={"/Login"}
              style={{ textDecoration: "none", color: theme.secondary }}
            >
              Login
            </Link>
          </Typography>
          <Button
            variant="contained"
            sx={[style.btn, { background: "#C7C8CC" }]}
            onClick={signupGoogle}
          >
            <FcGoogle style={{ fontSize: "22px", marginRight: "5px" }} /> Sign
            Up with Google
          </Button>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <Button variant="contained" sx={style.btn}>
              Back to Home page
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
const style = {
  bg: {
    position: "relative",
    display: "block",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundImage: `url(${bg})`,
  },
  LoginBox: {
    width: { lg: "20%", md: "40%", sm: "80%", xs: "100%" },
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
  slogan: {
    width: "100%",
    textAlign: "center",
    fontSize: "17px",
    fontWeight: 600,
    color: "white",
    fontFamily: "poppins",
    paddingTop: "15px",
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
