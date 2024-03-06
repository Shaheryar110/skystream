"use client";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [admin, setAdmin] = useState(() => {
    return localStorage.getItem("admin") === "true";
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  // useEffect(() => {
  //   const value = localStorage.getItem("admin") === "true";
  //   console.log(value,"valueContext");
  //   setAdmin(value)
  // }, [admin]);
  return (
    <AuthContext.Provider value={{ currentUser, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
