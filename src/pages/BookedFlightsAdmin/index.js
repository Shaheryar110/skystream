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
import { deleteDoc, doc, getDoc, updateDoc } from "@firebase/firestore";
const Index = () => {
  const [flights, setFlight] = useState();
  const handleDelete = async (index, flightId, seats) => {
    const collRef = doc(db, "flights", flightId);

    try {
      const docData = (await getDoc(collRef)).data();
      await updateDoc(collRef, {
        "aircraft.capacity": Number(docData.aircraft.capacity) + Number(seats),
      });
      await deleteDoc(doc(db, "bookFlights", index));
      get();
    } catch (error) {}
  };
  const get = () => {
    getData("bookFlights").then((data) => {
      setFlight(data);
    });
  };
  useEffect(() => {
    get();
  }, []);
  const fetchUsers = async () => {
    const updatedFlights = await Promise.all(
      flights?.map(async (item) => {
        const user = await getUserById(item?.userId);
        return { ...item, user };
      })
    );
    setFlight(updatedFlights);
  };
  useEffect(() => {
    if (flights?.length > 0) {
      fetchUsers();
    }
  }, [flights]);
  return (
    <>
      <AdminDashboard>
        <Box sx={style.bg}>
          <Typography sx={style.heading}>Booked Flights </Typography>
          {flights &&
            flights?.length > 0 &&
            flights?.map((item, index) => {
              const dateTimeA = new Date(item?.flightInfo?.arrivalTimeDate);

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
              const dateTimeD = new Date(item?.flightInfo?.departureTimeDate);

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

              {
                /* let user = await getUserById(item.userId);
              console.log(user, "user"); */
              }
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
                          {item?.flightInfo?.aircraft?.name}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>
                          Aircraft Booked Seats
                        </Typography>
                        <Typography sx={style.info}>{item?.seats}</Typography>
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
                          {item?.flightInfo?.arrivalAirport?.name}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>
                          Arrival Airport Location
                        </Typography>
                        <Typography sx={style.info}>
                          {item?.flightInfo?.arrivalAirport?.country}
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
                          {item?.flightInfo?.departureAirport?.name}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>
                          Departure Airport Location
                        </Typography>
                        <Typography sx={style.info}>
                          {item?.flightInfo?.departureAirport?.country}
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
                    <Grid item lg={4} sm={6} xs={12}>
                      <Typography sx={style.static}>
                        User Information
                      </Typography>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>User Name</Typography>
                        <Typography sx={style.info}>
                          {item?.user?.name}
                        </Typography>
                      </Box>
                      <Box sx={style.flexy}>
                        <Typography sx={style.info}>User Email</Typography>
                        <Typography sx={style.info}>
                          {item?.user?.email}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <MdDeleteForever
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      color: "red",
                    }}
                    size={30}
                    onClick={() =>
                      handleDelete(item.id, item.flightInfo.id, item.seats)
                    }
                  />
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
