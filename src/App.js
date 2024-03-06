import Home from "../src/pages/Home";
import Customers from "../src/pages/Customers";
import BookedFlights from "../src/pages/BookedFlights";
import Airports from "../src/pages/Airports";
import Aircrafts from "../src/pages/Aircrafts";
import ViewFlights from "../src/pages/ViewFlights";
import AddFlights from "../src/pages/AddFlights";
import BookedFlightsAdmin from "../src/pages/BookedFlightsAdmin";
import AdminContact from "../src/pages/ContactFormAdmin/AdminContact";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
AOS.init();
function App() {
  const { admin } = useContext(AuthContext);
  const protectedRoute = (component) => {
    console.log(admin, "admin");
    if (admin) {
      return component;
    } else {
      return <Login admin={true} />;
    }
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Aircrafts" element={protectedRoute(<Aircrafts />)} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Login" element={<Login admin={false} />} />
        <Route path="/SignUp" element={<SignUp />} />

        <Route path="/Airports" element={protectedRoute(<Airports />)} />
        <Route path="/AddFlights" element={protectedRoute(<AddFlights />)} />
        <Route path="/ViewFlights" element={protectedRoute(<ViewFlights />)} />
        <Route
          path="/book-flights-admin"
          element={protectedRoute(<BookedFlightsAdmin />)}
        />
        <Route path="/Leads" element={protectedRoute(<AdminContact />)} />
        <Route path="/book-flights" element={<BookedFlights />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
