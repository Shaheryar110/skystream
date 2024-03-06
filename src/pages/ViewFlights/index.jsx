import React, { useState, useEffect } from "react";
import bg from "../../Assets/Images/bg.jpeg";
import { Box, Typography, Grid, Button } from "@mui/material";
import AdminDashboard from "../../Components/common/AdminDashboard";
import { getData } from "../../Services/ReadData";
import { theme } from "../../Colors/color";
import BasicModal from "../../Components/common/BasicModal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/Config";
import toast from "react-hot-toast";
const Index = () => {
  const [flights, setFlight] = useState([]);
  const [openFlights, setOpenFlights] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (index) => {
    const newOpenFlights = [...openFlights];
    newOpenFlights[index] = true;
    setOpenFlights(newOpenFlights);
  };
  const handleDelete = async (id) => {
    const docRef = doc(db, "flights", id);
    try {
      const res = await deleteDoc(docRef);
      toast.success("Delete Success");
      getData("flights").then((data) => {
        console.log(data);
        setFlight(data);
        setOpenFlights(Array(data.length).fill(false));
      });
    } catch (error) {
      toast.success("Delete Error");
    }
  };
  const handleClose = (index) => {
    const newOpenFlights = [...openFlights];
    newOpenFlights[index] = false;
    setOpenFlights(newOpenFlights);
    getData("flights").then((data) => {
      console.log(data);
      setFlight(data);
      setOpenFlights(Array(data.length).fill(false));
    });
  };

  useEffect(() => {
    getData("flights").then((data) => {
      console.log(data);
      setFlight(data);
      setOpenFlights(Array(data.length).fill(false)); // Initialize open states for each flight
    });
  }, []);
  return (
    <>
      <AdminDashboard>
        <Box sx={style.bg}>
          <Typography sx={style.heading}>Flights Information</Typography>
          {flights &&
            flights?.map((item, index) => {
              const dateTimeA = new Date(item.arrivalTimeDate);

              // Format date
              const formattedDateA = dateTimeA.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });

              // Format time
              const formattedTimeA = dateTimeA.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const dateTimeD = new Date(item.departureTimeDate);

              // Format date
              const formattedDateD = dateTimeD.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });

              // Format time
              const formattedTimeD = dateTimeD.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <Box sx={style.LoginBox} key={index}>
                  <BasicModal
                    open={openFlights[index]}
                    onClose={() => handleClose(index)}
                    id={item.id}
                  />
                  <Grid container spacing={5}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box sx={style.space}>
                        <Button
                          variant="contained"
                          sx={style.btn}
                          onClick={() => handleOpen(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          sx={style.btn}
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                      <Typography sx={style.static}>
                        Aircraft Information
                      </Typography>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>Aircraft Name</Typography>
                        <Typography sx={style.info}>
                          {item?.aircraft?.name}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>
                          Aircraft Total Seats
                        </Typography>
                        <Typography sx={style.info}>
                          {item?.aircraft?.capacity}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                      <Typography sx={style.static}>
                        Arrival Information
                      </Typography>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>
                          Arrival Airport Name
                        </Typography>
                        <Typography sx={style.info}>
                          {item?.arrivalAirport?.name}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>
                          Arrival Airport Location
                        </Typography>
                        <Typography sx={style.info}>
                          {item?.arrivalAirport?.city} /{" "}
                          {item?.arrivalAirport?.country}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>Arrival Date</Typography>
                        <Typography sx={style.info}>
                          {formattedDateA}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>Arrival Time</Typography>
                        <Typography sx={style.info}>
                          {formattedTimeA}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                      <Typography sx={style.static}>
                        Departure Information
                      </Typography>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>
                          Departure Airport Name
                        </Typography>
                        <Typography sx={style.info}>
                          {item?.departureAirport?.name}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>
                          Departure Airport Location
                        </Typography>
                        <Typography sx={style.info}>
                          {item?.departureAirport?.city} /{" "}
                          {item?.departureAirport?.country}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>Departure Date</Typography>
                        <Typography sx={style.info}>
                          {formattedDateD}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>Departure Time</Typography>
                        <Typography sx={style.info}>
                          {formattedTimeD}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </Box>
      </AdminDashboard>
    </>
  );
};

export default Index;
const style = {
  space: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: "100%",
    alignItems: "center",
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
    width: "80%",
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
  },
  info: {
    color: "white",
    fontFamily: "poppins",
  },
};
