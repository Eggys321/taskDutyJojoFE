import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { useState } from "react";

function SignIn(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
 const handleLogin = async (e)=>{
    e.preventDefault()
    const logInData = {
        email,
        password,
      };
    // console.log(email,password);
    try {
        const fetchedData = await fetch('http://localhost:6767/api/login',{
            method:"POST",
            headers:{
              "Content-type": "application/json",
            },
            body: JSON.stringify(logInData),
          }
          )
          const res = await fetchedData.json();
          console.log(res);
          if(res.success === true){
            toast.success(res.message)
            
          }
          if(res.success === false || res.name === "ValidationError"){
            toast.error(res.message)
          }
          if(res.token){
            localStorage.setItem('token', res.token)
            // navigate('/')
            // setLoggedIn(true)
          }
        
    } catch (error) {
        
    }

 }
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
          Sign In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
      <div className="container-lg">
        <div className="">
          <div className="mb-3">
            <label className="d-block" htmlFor="email">
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
            <label className="d-block" htmlFor="password">
              Password
            </label>
            <div className="d-flex">
            <input 
             className="form-control "
             value={password}
            type="password" 
            name="password" 
            placeholder="password" 
            onChange={(e)=>setPassword(e.target.value)}
            />
            
            <br />
            </div>
          </div>
        </div>
        <button className="btn btn-primary text-white" onClick={handleLogin}>Submit</button>
      </div>

      </form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default SignIn;