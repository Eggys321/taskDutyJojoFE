import React from "react";
import { Link } from "react-router-dom";
import heroImg from '../assets/heroImg.svg'
import { Button } from "react-bootstrap";
import '../styles/Hero.css'

const Hero = () => {
  return (
    <main className="container my-5">
      <div className="row justify-content-between align-items-center">
        <div className=" col-lg-6 hero-container">
          <h2>Manage your Tasks on <span>TaskDuty</span></h2>
          <div>
            <p className="lh-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus, sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl semper porttitor. Nec accumsan.
            </p>
            <Link to='/AllTask'>
                 <Button className="w-75 fs-4 " variant="secondary">

            Go to My Tasks
                 </Button>
            
            </Link>
          </div>
        </div>
        <div className=" col-lg-4 pt-3">
            <img className="img-fluid" src={heroImg} alt="hero-image" />
        </div>
      </div>
    </main>
  );
};

export default Hero;
