import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

const EditTask = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const {loggedIn} = useContext(AuthContext)

  const navigate = useNavigate();

  const fetchedData = async () => {
    try {
      let dataGotten = await axios.get(
        `https://task-duty-jojo.onrender.com/api/singletask/${userId}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(dataGotten.data.task);
      setTitle(dataGotten.data.task.title);
      setDescription(dataGotten.data.task.description);
      setTags(dataGotten.data.task.tags);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      let data = await axios.patch(
        `https://task-duty-jojo.onrender.com/api/task/${userId}`,
        {
          title,
          description,
          tags,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if ((data.data.success = true)) {
        // alert(data.data.message)
        toast.success(data.data.message);
      }
      console.log(data);
      navigate("/AllTask");
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    document.title = "Edit || Page";
    fetchedData();
    if (!token) {
      toast.error("unauthorized,please login/signup");
      navigate("/");
    }
  }, [userId]);
  return (
    <div className="container my-5">
      <h1>EditTask</h1>
      <form action="">
        <div className="fieldset-container m-5 h-25">
          <h5 className="fieldset-title fs-4">Task Title</h5>
          <input
            type="text"
            className="w-100"
            placeholder="E.g Project Defense, Assignment ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="fieldset-containers m-5 h-25">
          <h5 className="fieldset-title fs-4">Description</h5>
          <input
            type="text"
            className="w-100"
            placeholder="Briefly describe your task ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* options */}
        <div className="fieldset-container m-5">
          <h5 className="fieldset-title fs-4">Tags</h5>
          <Form.Select
            id="disabledSelect"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          >
            <option value="urgent">urgent</option>
            <option value="important"> important </option>
          </Form.Select>
        </div>
        <div>
          <button
            className="btn btn-lg text-light fs-4 w-100"
            style={{ backgroundColor: "#974FD0" }}
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </form>
      {/* ---- */}
      {/* <Form>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        <br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <Form.Group className="mb-3 fw-bold">
          <Form.Label htmlFor="disabledSelect">Tags:</Form.Label>
          <Form.Select
            id="disabledSelect"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          >
            <option value="urgent">urgent</option>
            <option value="important"> important </option>
          </Form.Select>
        </Form.Group>
        <button className="btn btn-success" onClick={handleUpdate}>
          update
        </button>
      </Form> */}
    </div>
  );
};

export default EditTask;
