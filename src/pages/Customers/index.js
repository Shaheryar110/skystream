import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../../Components/common/DashboardSidebar";
import bg from "../../Assets/Images/bg.jpeg";
import { Box, Typography, Grid, Button } from "@mui/material";
import { getData, updateTotalSeats } from "../../Services/ReadData";
import { RiErrorWarningFill } from "react-icons/ri";
import { theme } from "../../Colors/color";
import toast from "react-hot-toast";
import { AddFlightBooking } from "../../Services/AddData";
import { v4 as uuidv4 } from "uuid";
const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [flights, setFlight] = useState();
  const [seats, setSeats] = useState([]);

  const handleSeatChange = (index, value) => {
    const updatedSeats = [...seats];
    updatedSeats[index] = value;
    setSeats(updatedSeats);
  };
  const bookFlight = (flightInfo, index, seat) => {
    if (
      seat[index] > 12 ||
      Number(flightInfo.aircraft?.capacity) < seat[index]
    ) {
      toast.error("Cant Select more then 12 seats Or Check the total Seats");
    } else {
      let temp = {
        flightInfo,
        seats: seat[index],
        userId: currentUser.uid,
      };
      const totalSeats = Number(flightInfo.aircraft?.capacity) - seat[index];
      // console.log(totalSeats, "totalSeats");

      updateTotalSeats(totalSeats, flightInfo.id)
        .then(() => {
          // toast.success("Booking Successfull");
          // setSeats(0);
          console.log("done");
          get();
        })
        .catch((err) => {
          // toast.error("Something went wrong!");
          console.log(err);
        });
      AddFlightBooking(temp)
        .then(() => {
          toast.success("Booking Successfull");
          setSeats(0);
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    }
  };
  const get = () => {
    getData("flights").then((data) => {
      console.log(data);
      setFlight(data);
    });
  };
  useEffect(() => {
    get();
  }, []);
  useEffect(() => {
    if (!currentUser) {
      navigate("/Login");
    }
  }, [currentUser]);
  return (
    <>
      <ResponsiveDrawer>
        <Box sx={style.bg}>
          <Typography sx={style.heading}>Flights Information</Typography>
          {flights &&
            flights?.map((item, index) => {
              const dateTimeA = new Date(item.arrivalTimeDate);

              // Format date
              const formattedDateA = dateTimeA.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              // Format time
              const formattedTimeA = dateTimeA.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const dateTimeD = new Date(item.departureTimeDate);

              // Format date
              const formattedDateD = dateTimeD.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              // Format time
              const formattedTimeD = dateTimeD.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <Box sx={style.LoginBox} key={index}>
                  <Grid container spacing={5}>
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

                  <Box
                    sx={{
                      width: "50%",
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "start",
                      justifyContent: "start",
                      gap: "12px",
                    }}
                  >
                    <Box>
                      <input
                        className="input"
                        type="number"
                        name="name"
                        id="name"
                        placeholder=" maximum 12 seats"
                        value={seats[index]}
                        onChange={(e) =>
                          handleSeatChange(index, e.target.value)
                        }
                        required
                      />
                      <Typography sx={style.waring}>
                        <RiErrorWarningFill style={{ color: "white" }} /> One
                        person allowed 12 seats to book at once
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={style.btn}
                      onClick={() => bookFlight(item, index, seats)}
                    >
                      Book Now
                    </Button>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </ResponsiveDrawer>
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
