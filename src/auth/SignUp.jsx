import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleReg = async(e) => {
    e.preventDefault();
    const signUpData = {
        email,
        password,
        name
    }
    try {
        const fetchReq = await fetch('http://localhost:6767/api/register',{
            method:"POST",
            headers:{
              "Content-type": "application/json",
            },
            body: JSON.stringify(signUpData),
          })
          const res = await fetchReq.json();
          console.log(res);
          if(res.success === true){
            toast.success(res.message)
            setEmail('')
            setName('')
            setPassword('')
            return
          }
          if(res.success === false){
            toast.error(res.message)
            return
          }
          if(res.error.name === "ValidationError"){
            toast.error(res.error.message)
            return
          }
          if(res.error.code === 11000){
            toast.error('Email already in use')
            return
          }
    } catch (error) {
        console.log(error.message);
        
    }
    
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-center w-100"
        >
          Register
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="container-lg">
            <div className="">
              <div className="mb-3">
                <label className="d-block" htmlFor="">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="firstname"
                  placeholder="Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="d-block" htmlFor="">
                  Email
                </label>
                <input
                  className="form-control "
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}

                />
              </div>
              <div className="mb-3">
                <label className="sand d-block" htmlFor="password">
                  Password
                </label>
                <div className="d-flex num-inp">
                  <input
                    className="form-control "
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}

                  />
                  <br />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary sub text-white"
              onClick={handleReg}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default SignUp;
