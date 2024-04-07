import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [reveal, setReveal] = useState(false);
  const { setLoggedIn } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    const logInData = {
      email,
      password,
    };
    setIsClicked(true);
    // console.log(email,password);
    try {
      const fetchedData = await fetch(
        "https://task-duty-jojo.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(logInData),
        }
      );
      const res = await fetchedData.json();
      console.log(res);
      if (res.success === true) {
        toast.success(res.message);
        setEmail("");
        setPassword("");
        setIsClicked(true);
      }
      if (res.success === false || res.name === "ValidationError") {
        toast.error(res.message);
      }
      if (res.token) {
        localStorage.setItem("token", res.token);
        // navigate('/')
        setLoggedIn(true);
      }
    } catch (error) {
    } finally {
      setIsClicked(false);
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="d-block" htmlFor="password">
                  Password
                </label>
                <div className="d-flex position-relative">
                  <input
                    className="form-control "
                    value={password}
                    type={reveal ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p
                    className="position-absolute end-0 pe-2 pt-1"
                    role="button"
                    onClick={handleHide}
                  >
                    {reveal ? "hide" : "show"}
                  </p>
                  <br />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary text-white"
              onClick={handleLogin}
              disabled={isClicked}
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

export default SignIn;
