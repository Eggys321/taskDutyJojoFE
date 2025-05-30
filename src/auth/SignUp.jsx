import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [reveal, setReveal] = useState(false);
  const handleReg = async(e) => {
    e.preventDefault();
    const signUpData = {
        email,
        password,
        name
    }
    setIsClicked(true)
    try {
        const fetchReq = await fetch('https://task-duty-jojo.onrender.com/api/register',{
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
            setIsClicked(true)
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
        
    }finally{
      setIsClicked(false)
    }
    
  };
  function handleHide() {
    !reveal ? setReveal(true) : setReveal(false);
  }
  const btnText = isClicked ? "Loading..." : "Sign In";

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
                <div className="d-flex num-inp position-relative">
                  <input
                    className="form-control "
                    type={reveal ? "text" : "password"}                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}

                  />
                  <p className="position-absolute end-0"role="button"  onClick={handleHide} >{reveal ? "hide" : "show"}</p>
                  <br />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary sub text-white"
              onClick={handleReg}
              disabled = {isClicked}
            >
              {btnText}
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