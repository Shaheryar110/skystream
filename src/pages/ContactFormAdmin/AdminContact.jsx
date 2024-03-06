import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../../Components/common/DashboardSidebar";
import bg from "../../Assets/Images/bg.jpeg";
import { Box, Typography, Grid } from "@mui/material";
import { getData, getUserById, userBookFlights } from "../../Services/ReadData";
import { theme } from "../../Colors/color";
import AdminDashboard from "../../Components/common/AdminDashboard";
import { MdDeleteForever } from "react-icons/md";
import { db } from "../../Firebase/Config";
import { deleteDoc, doc } from "@firebase/firestore";
const Index = () => {
  const [flights, setFlight] = useState();
  const handleDelete = async (index) => {
    await deleteDoc(doc(db, "bookFlights", index));
    get();
  };
  const get = () => {
    getData("Contact").then((data) => {
      setFlight(data);
      console.log(data);
    });
  };
  useEffect(() => {
    get();
  }, []);
  useEffect(() => {
    console.log(flights, "flights");
  }, [flights]);

  return (
    <>
      <AdminDashboard>
        <Box sx={style.bg}>
          <Typography sx={style.heading}>Contact Forms </Typography>
          <Grid container spacing={3}>
            {flights &&
              flights?.map((item, index) => {
                console.log(item, "item");
                return (
                  <Grid item lg={4} key={index}>
                    <Box sx={style.LoginBox} key={index}>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}> Name</Typography>
                        <Typography sx={style.info}>{item?.name}</Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}> Subject</Typography>
                        <Typography sx={style.info}>{item?.subject}</Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}> Message</Typography>
                        <Typography sx={style.info}>{item?.message}</Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}> Address</Typography>
                        <Typography sx={style.info}>{item?.address}</Typography>
                      </Box>
                      {/* <MdDeleteForever
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      color: "red",
                    }}
                    size={30}
                    onClick={() => handleDelete(item.id)}
                  /> */}
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </AdminDashboard>
    </>
  );
};

export default Index;
const style = {
  btn: {
    fontWeight: 600,
    fontSize: 15,
    paddingX: "20px",
    paddingY: "10px",
    fontFamily: "Poppins",
    marginTop: "1rem",
    background: theme.secondary,
  },
  flexy: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bg: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundImage: `url(${bg})`,
    overflowY: "scroll",
    paddingX: "1rem",
  },
  heading: {
    color: "white",
    fontSize: "30px",
    fontWeight: 700,
    textAlign: "left",
    paddingTop: "4rem",
  },
  static: {
    color: "white",
    fontSize: "20px",
    fontWeight: 600,
    textAlign: "center",
    paddingBottom: "12px",
  },
  LoginBox: {
    // height: "50%",
    width: "100%",
    borderRadius: "1rem",
    padding: "1.3rem",
    background: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    display: "flex",
    marginY: "12px",
    flexDirection: "column",
    position: "relative",
  },
  info: {
    color: "white",
    fontFamily: "poppins",
  },
  waring: {
    color: "white",
    fontFamily: "poppins",
    fontSize: "13px",
    marginTop: "4px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};
