import React from "react";
import { Carousel } from "react-bootstrap";
import "../../styles/dashboard.css";
import { getUserNameFromToken } from "../../utils/jwt"; 

const WelcomeBanner = () => {
  const name = getUserNameFromToken() || "Admin";

  const slides = ["/images/slide1.jpg", "/images/slide2.jpg", "/images/slide3.jpg"];

  return (
    <div className="welcome-carousel-wrapper">
      <Carousel controls={false} indicators={false} interval={2000} fade>
        {slides.map((img, index) => (
          <Carousel.Item key={index}>
            <div
              className="carousel-image"
              style={{
                backgroundImage: `url(${img})`,
              }}
            >
              <div className="carousel-caption">
                <h1>Welcome, {name}!</h1>
                <p>Glad to see you back.</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default WelcomeBanner;