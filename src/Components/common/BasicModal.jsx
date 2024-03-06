import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getData, getSpcecificFlight } from "../../Services/ReadData";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { theme } from "../../Colors/color";
import toast from "react-hot-toast";
import { AddFlight } from "../../Services/AddData";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Config";

const styledd = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, onClose, id }) {
  const [airport, setAirport] = React.useState([]);
  const [aircraft, setAircraft] = React.useState([]);
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0"); // Adding 1 as months are zero-indexed
    const day = `${now.getDate()}`.padStart(2, "0");
    const hours = `${now.getHours()}`.padStart(2, "0");
    const minutes = `${now.getMinutes()}`.padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  const [formData, setFormData] = React.useState({});
  const handleOnChange = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };
  const onSubmit = async () => {
    const {
      arrivalAirport,
      departureAirport,
      arrivalTimeDate,
      departureTimeDate,
      aircraft,
    } = formData;
    if (
      arrivalAirport === "" ||
      departureAirport === "" ||
      arrivalTimeDate === "" ||
      departureTimeDate === "" ||
      aircraft === ""
    ) {
      toast.error("Fill All Fields");
      console.log("Fill all fields");
      return;
    }
    const docRef = doc(db, "flights", id);
    try {
      const res = await updateDoc(docRef, formData);

      toast.success("Flight Update successfully");
      setFormData({});
      onClose();
    } catch (error) {
      console.log(error);
      toast.success("Flight Update Error");
    }
  };
  const getsData = async () => {
    try {
      const airportData = await getData("airports");
      console.log(airportData, "airportData");
      setAirport(airportData);
      const aircraftData = await getData("aircrafts");
      setAircraft(aircraftData);
    } catch (error) {
      console.log("error", error);
    }
  };
  React.useEffect(() => {
    getsData();
  }, []);
  React.useEffect(() => {
    if (id) {
      getSpcecificFlight(id).then((data) => {
        console.log(data);
        setFormData(data);
      });
    }
  }, [open, id]);

  React.useEffect(() => {
    console.log(formData, "form");
  }, [formData]);
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          ".MuiDialog-paper": {
            padding: "1.3rem",
            background: "rgba(0, 0, 0, 0.6)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            backdropFilter: "blur(20px)",
            borderRadius: "15px",
            WebkitBackdropFilter: "blur(20px)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontFamily: "'poppins'",
            color: "white",
            fontSize: "25px",
            fontWeight: 600,
          }}
        >
          Edit Flight
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={styles.formControl}>
            <InputLabel id="demo-simple-select-label">Add Aircraft</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.aircraft?.id}
              label="Add Aircraft"
              fullWidth
              onChange={(e) =>
                handleOnChange(
                  "aircraft",
                  aircraft.find((item) => item.id === e.target.value)
                )
              }
              sx={styles.select}
            >
              {aircraft?.map((data) => (
                <MenuItem key={data.id} value={data.id}>
                  {data?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={styles.formControl}>
            <InputLabel id="demo-simple-select-label">
              Add Arival Airport
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.arrivalAirport?.id}
              label="Add Arival Airport"
              fullWidth
              onChange={(e) =>
                handleOnChange(
                  "arrivalAirport",
                  airport?.find((item) => item.id === e.target.value)
                )
              }
              sx={styles.select}
            >
              {airport?.map((data) => (
                <MenuItem key={data.id} value={data.id}>
                  {data?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div
            style={{
              marginTop: " 1.5rem",
              display: "grid",
              alignItems: "center",
              width: "100%",
            }}
          >
            <input
              type="datetime-local"
              id="birthday"
              name="birthday"
              className="input"
              value={formData?.arrivalTimeDate}
              onChange={(e) =>
                handleOnChange("arrivalTimeDate", e.target.value)
              }
            />
            <label className="label">Add Arrival Time & Date</label>
          </div>

          <FormControl fullWidth sx={styles.formControl}>
            <InputLabel id="demo-simple-select-label">
              Add Departure Airport
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData?.departureAirport?.id}
              label="Add Departure Airport"
              fullWidth
              onChange={(e) =>
                handleOnChange(
                  "departureAirport",
                  airport?.find((item) => item.id === e.target.value)
                )
              }
              sx={styles.select}
            >
              {airport?.map((data) => (
                <MenuItem key={data.id} value={data.id}>
                  {data?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div
            style={{
              marginTop: " 1.5rem",
              display: "grid",
              alignItems: "center",
              width: "100%",
            }}
          >
            <input
              type="datetime-local"
              id="birthday"
              name="birthday"
              className="input"
              value={formData?.departureTimeDate}
              onChange={(e) =>
                handleOnChange("departureTimeDate", e.target.value)
              }
            />
            <label className="label">Add Departure Time & Date</label>
          </div>

          <Button variant="contained" sx={style.btn} onClick={onSubmit}>
            UPDATE
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
const style = {
  btn: {
    fontWeight: 600,
    fontSize: 15,
    paddingX: "20px",
    paddingY: "10px",
    fontFamily: "Poppins",
    marginTop: "1rem",
    width: "100%",
    background: theme.secondary,
  },
};
const styles = {
  formControl: {
    "& .MuiInputLabel-root": {
      color: "white !important", // Label color
    },
    marginTop: "1.5rem",
  },
  select: {
    "& .MuiOutlinedInput-input": {
      color: "white", // Text color
    },
    "& .MuiInputLabel-outlined": {
      color: "white !important", // Label color
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important", // Border color
      borderRadius: "7px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important", // Hover border color
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important", // Focused border color
    },
    "& .MuiSelect-icon": {
      color: "white", // Dropdown icon color
    },
    "& .MuiListItem-root": {
      color: "white", // Text color in options
    },
    input: {
      color: "white", // Text color
      border: "2px solid white", // Border color
      borderRadius: "4px", // Border radius
      padding: "8px", // Padding
      width: "100%", // Width
      boxSizing: "border-box", // Ensure padding and border are included in width
    },
    wrapper: {
      width: "100%", // Set full width
      marginBottom: "16px", // Add margin bottom for spacing
    },
  },
};
