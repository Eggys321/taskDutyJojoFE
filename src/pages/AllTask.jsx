import React, { useEffect, useState,useContext } from "react";
import ClientTask from "../components/ClientTask";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link, useParams,useNavigate } from "react-router-dom";

const AllTask = () => {
  const navigate = useNavigate();

  const {loggedIn} = useContext(AuthContext)
  useEffect(() => {
    if (!loggedIn) {
      toast.error("unauthorized,please login/signup");
      navigate("/Home");
    }
  });
  return (
    <main className="container ">
      <ClientTask/>
    </main>
  );
};

export default AllTask;
