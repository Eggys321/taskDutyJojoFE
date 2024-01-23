import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useMatch } from "react-router-dom";
import navLogo from "../assets/navbrand.svg";
import navImg from "../assets/navImg.svg";

const NavBar = () => {
  const isAbout = useMatch("/AllTask");
  const isNew = useMatch("/NewTask");
  return (
    <>
      <Navbar expand="lg" className="container mt-4">
        <Container fluid>
          <h2>
            {" "}
            <Link to="/" className="text-decoration-none text-dark">
              {" "}
              <img src={navLogo} alt="na-logo" /> TaskDuty{" "}
            </Link>{" "}
          </h2>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <div className="d-flex gap-4 lh-base align-items-center">
              {!isNew && "AllTask" && (
                <Link to="/NewTask" className="text-decoration-none text-dark">
                  <h4> New Task </h4>
                </Link>
              )}

              {!isAbout && "/AllTask" && (
                <Link to="/AllTask" className="text-decoration-none text-dark">
                  <h4> All Task </h4>
                </Link>
              )}

              <Link className="text-decoration-none text-dark d-none d-lg-block">
                <img src={navImg} alt="nav-img" />{" "}
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />
    </>
  );
};

export default NavBar;
