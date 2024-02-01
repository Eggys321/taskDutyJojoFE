import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const token = localStorage.getItem("token");

  async function getLoggedIn() {
    const req = await fetch("https://task-duty-jojo.onrender.com/api/isloggedin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await req.json();
    console.log(data);
    setLoggedIn(data);
  }
  useEffect(() => {
    getLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        getLoggedIn,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
