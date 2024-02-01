import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const EditTask = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const { userId } = useParams();
  const token = localStorage.getItem("token");

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
    e.preventDefault()
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
      console.log(data);
      navigate("/AllTask");
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    document.title = "Edit || Page";
    fetchedData();
  }, [userId]);
  return (
    <div className="container">
      <h1>EditTask</h1>
      <Form>
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
            {/* <option>----</option> */}
            <option value="urgent">urgent</option>
            <option value="important"> important </option>
          </Form.Select>
        </Form.Group>
        <button
          className="btn btn-success"
          onClick={handleUpdate}
        >
          update
        </button>
      </Form>
    </div>
  );
};

export default EditTask;
