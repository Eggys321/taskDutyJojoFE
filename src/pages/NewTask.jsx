import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import chevronLeft from "../assets/eva_arrow-ios-back-fill.svg";
import Form from 'react-bootstrap/Form';
import '../styles/NewTask.css'
import axios from "axios";
import toast from "react-hot-toast";

const NewTask = () => {
  const [title, setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [tags,setTags] = useState('')
  const navigate = useNavigate()

 
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const data = await axios.post('https://task-duty-jojo.onrender.com/api/task',{
        title,
        description,
        tags
      })
      console.log(data);
      if(data.status === 201){
        toast.success(data.data.message)
        navigate('/AllTask')

      }
     
     
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }

  }
  useEffect(() => {
    document.title = "New-Task || Page";
  });
  const scrollToTop =()=>{
    window.scroll({top:0,behavior:"smooth"})
  }
  return (
    <main className="container">
      <div className="mt-4">
        <Link to="/" className="text-decoration-none text-dark fs-1 fw-bold">
          <img src={chevronLeft} alt="arrow-back-logo" />
          New Task
        </Link>
      </div>
      <form action="">


      <div className="fieldset-container m-5 h-25">
        <h5 className="fieldset-title fs-4">Task Title</h5>
        <input
          type="text"
          className="w-100"
          placeholder="E.g Project Defense, Assignment ..."
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>
      <div className="fieldset-containers m-5 h-25">
        <h5 className="fieldset-title fs-4">Description</h5>
        <input
          type="text"
          className="w-100"
          placeholder="Briefly describe your task ..."
          value={description}
          onChange={(e)=>setDescription(e.target.value)}

        />
      </div>
      {/* options */}
      <div className="fieldset-container m-5">
        <h5 className="fieldset-title fs-4">Tags</h5>
        <Form.Select aria-label="Default select example" className="form-select" onChange={(e)=>setTags(e.target.value)}>
          <option value="">
            <span>URGENT</span> <span>IMPORTANT</span>
          </option>
          <option value='urgent'>urgent</option>
          <option value='important'>important</option>


        </Form.Select>
      </div>
      <div>
        <button className="btn btn-lg text-light fs-4 w-100" style={{backgroundColor:"#974FD0"}} onClick={handleSubmit}>
          Done
        </button>
      </div>
      </form>
      <Link onClick={scrollToTop}>
        <p className="text-center fs-4 mt-5" style={{ color: "#974FD0" }}>
          Back to Top
        </p>
      </Link>
    </main>
  );
};

export default NewTask;
