import React, { useContext, useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import editLogo from "../assets/clarity_note-edit-line.svg";
import deleteLogo from "../assets/fluent_delete-24-regular.svg";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

const ClientTask = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useParams();
  const {loggedIn} = useContext(AuthContext)
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const request = await fetch(`https://task-duty-jojo.onrender.com/api/task/${userId}`,{
        headers:{
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
      })
      const res = await request.json()
      console.log(res.task);
      setData(res.task)
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // delete ftn
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `https://task-duty-jojo.onrender.com/api/task/${userId}`,{
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
      }

      setData(data.filter((existingDatum) => existingDatum._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data);
  useEffect(() => {
    document.title = "All-Tasks || Page";
    fetchData();
    if (!loggedIn) {
        toast.error("unauthorized,please login/signup");
        navigate("/");
      }
  }, []);
  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  return (
    <main className="container ">
      <div className="mt-4">
        <p> {isLoading && <Spinner animation="border" />} </p>
        <div className="d-flex justify-content-between align-items-center">
          <Link className="text-decoration-none text-dark">
            <h1>My Task</h1>
          </Link>
          <Link to="/NewTask" className="text-decoration-none text-dark">
            <h3 style={{ color: "#974FD0" }}> + Add to My Task </h3>
          </Link>
        </div>
      </div>
      <section className="mt-5 ">
        {data && data.length >= 1 ? (
          <>
            {data.map((datum) => {
              const { _id, tags, title, description } = datum;
              return (
                <div className="mt-5 border rounded" key={_id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="text-danger ms-3"> {tags} </h4>
                    <div className="d-flex gap-3 my-3">
                      <Link to={`/EditTask/${_id}`} className="text-decoration-none">
                        <button
                          className="btn btn text-light btn-lg"
                          style={{ backgroundColor: "#974FD0" }}
                        >
                          <img src={editLogo} alt="edit-logo" />
                          Edit
                        </button>
                      </Link>
                      <div>
                        <button
                          className="btn btn-light btn-lg"
                          style={{ color: "974FD0" }}
                          onClick={() => handleDelete(_id)}
                        >
                          <img src={deleteLogo} alt="delete-logo" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-4 p-2">
                    <h2> {title} </h2>
                    <p className="fs-3">{description}</p>
                  </div>
                </div>
               
              );
            })}
          </>
        ) : (
          <>
            <h2> No task(s) </h2>
          </>
        )}
      </section>

      <Link onClick={scrollToTop}>
        <p className="text-center fs-4 mt-5" style={{ color: "#974FD0" }}>
          Back to Top
        </p>
      </Link>
    </main>
  );
};

export default ClientTask;
