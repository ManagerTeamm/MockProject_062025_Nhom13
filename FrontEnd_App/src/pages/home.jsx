import React from 'react';
import slide1 from '../images/slide1.png'
import slide2 from '../images/slide2.png'
import slide3 from '../images/slide3.png'
import compStatCrimeStats from '../images/compStatCrimeStats.png'
import bodywornCameras from '../images/bodywornCameras.png'
import smallLogo from '../images/smallLogo.png'
import bigLogo from '../images/bigLogo.png'
import helpIsAvailable from '../images/helpIsAvailable.png'
import { Carousel } from 'react-bootstrap';

function HeaderTopBar() {
  return (
    <div className="bg-dark text-white small px-3 py-1 d-flex justify-content-between align-items-center" style={{fontSize: 12}}>
      <span>
        <img src={smallLogo} alt="NYC" height="15" style={{marginRight: 8}} />
        New York City Police Department
      </span>
      <span>
        <div className="dropdown">
          <button
            className="btn btn-sm dropdown-toggle border-0 text-white"
            type="button"
            id="languageDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ fontSize: '0.85rem' }}
          >
            English <i className="bi bi-caret-down-fill"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
            <li><a className="dropdown-item small" href="#">Tiếng Việt</a></li>
            <li><a className="dropdown-item small" href="#">日本語</a></li>
            <li><a className="dropdown-item small" href="#">Français</a></li>
          </ul>
        </div>

      </span>
    </div>
  );
}

function MainNavbar() {
  return (
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container d-flex flex-column align-items-center justify-content-between">
          <div className="logo-container border-bottom d-flex align-items-center justify-content-center mb-5" 
              style={{ width: '100vw'}}>
            <a className="navbar-brand" href="#">
            <img src={bigLogo} width="256" height="100" alt="NYPD Logo"/>
          </a>
          </div>
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav mb-2 mb-lg-0 me-5">
              <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
              <li className="nav-item border-start ps-3 ms-3"><a className="nav-link" href="#">About</a></li>
              <li className="nav-item border-start ps-3 ms-3"><a className="nav-link" href="#">Bureaus</a></li>
              <li className="nav-item border-start ps-3 ms-3"><a className="nav-link" href="#">Services</a></li>
              <li className="nav-item border-start ps-3 ms-3"><a className="nav-link" href="#">Stats</a></li>
              <li className="nav-item border-start ps-3 ms-3"><a className="nav-link" href="#">Policies</a></li>
            </ul>
            <form className="d-flex border rounded-2" role="search" style={{ backgroundColor: '#EEEEEE' }}>
              <div className="input-group input-group-sm">
                <span className="input-group-text border-0" style={{ backgroundColor: '#EEEEEE', color: '#878787' }}>
                  <i className="bi bi-search"></i>
                </span>
                <input
                  className="form-control border-0"
                  placeholder="Search"
                  style={{ backgroundColor: '#EEEEEE', color: '#878787' }}
                />
              </div>
            </form>
          </div>
        </div>
      </nav>
  );
}

const slides = [
  { src: slide1, alt: 'Slide 1' },
  { src: slide2, alt: 'Slide 2' },
  { src: slide3, alt: 'Slide 3' },
];

function HeroSection() {
  return (
    <Carousel 
      variant="dark"
      fade
      className="shadow rounded" 
      style={{ maxWidth: 900, maxHeight:500, margin: '0 auto' }}
    >
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          <img
            src={slide.src}
            alt={slide.alt}
            className="d-block w-100 h-100 object-fit-cover"
            style={{
              borderRadius: 12,
              maxHeight: 500,
              objectFit: 'cover',
            }}
          />

        </Carousel.Item>
      ))}
    </Carousel>
  );
}

function HowYouCanHelp() {
  return (
    <section className="text-center my-5">
      <h3 className="fw-bold mb-4">How You Can Help?</h3>
      <div className="row justify-content-center mb-4">
        <div className="col-md-2">
          <i className="bi bi-chat-square-text" style={{fontSize: 36}}></i>
          <div>Tell us what happened.</div>
        </div>
        <div className="col-md-2">
          <i className="bi bi-people" style={{fontSize: 36}}></i>
          <div>Your contribution & our mission.</div>
        </div>
        <div className="col-md-2">
          <i className="bi bi-shield-shaded" style={{fontSize: 36}}></i>
          <div>Protect yourself and others.</div>
        </div>
      </div>
      <button className="btn btn-primary px-5 py-2">File A Report</button>
      <hr className="my-5" style={{maxWidth: 700, margin: "2rem auto"}}/>
    </section>
  );
}

function ProgramsResources() {
  return (
    <section className="container my-4">
      <h4 className="fw-bold mb-4 text-center">Programs and Resources</h4>
      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4 text-center mb-4">
          <img src={compStatCrimeStats} style={{width:350, height:390, objectFit:'contain', marginBottom:7}}></img>
          <div className="fw-bold mb-1" style={{color:'#235ea3'}}>CompStat & Crime Stats</div>
          <div className="small text-muted">
            Access crime statistics, traffic data, reports, and CompStat 2.0, an advanced digital crime-tracking system that delivers block-by-block data.
          </div>
        </div>
        {/* Card 2 */}
        <div className="col-md-4 text-center mb-4">
          <img src={bodywornCameras} style={{width:350, height:390, objectFit:'contain', marginBottom:7}}></img>
          <div className="fw-bold mb-1" style={{color:'#235ea3'}}>Body-worn Cameras</div>
          <div className="small text-muted">
            Body-worn cameras have come to the NYPD. What you need to know.
          </div>
        </div>
        {/* Card 3 */}
        <div className="col-md-4 text-center mb-4">
          <img src={helpIsAvailable} style={{width:350, height:390, objectFit:'contain', marginBottom:7}}></img>
          <div className="fw-bold mb-1" style={{color:'#235ea3'}}>CompStat & Crime Stats</div>
          <div className="small text-muted">
            Access crime statistics, traffic data, reports, and CompStat 2.0, an advanced digital crime-tracking system that delivers block-by-block data.
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white mt-5 pt-4">
      <div className="container pb-3">
        <div className="row gy-3">
          <div className="col-sm-3 small">
            <div>Directory of City Agencies</div>
            <div>Notify NYC</div>
            <div>NYC Mobile Apps</div>
          </div>
          <div className="col-sm-3 small">
            <div>Contact NYC Government</div>
            <div>CityStore</div>
            <div>Maps</div>
          </div>
          <div className="col-sm-3 small">
            <div>City Employees</div>
            <div>Stay Connected</div>
            <div>Resident Toolkit</div>
          </div>
          <div className="col-sm-3 small">
            <div className="d-flex">
              {/* NYC logo */}
              <img
                src={smallLogo}
                alt="NYC logo"
                height="24"
                className="mb-2 me-2"
              />

              {/* Search box */}
              <form className="d-flex mb-2" role="search">
                <div className="input-group input-group-sm rounded-2 overflow-hidden" style={{ backgroundColor: '#EEEEEE' }}>
                  <input
                    className="form-control border-0"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ backgroundColor: '#EEEEEE', color: '#000' }}
                  />
                  <button className="btn btn-light border-0" type="submit">
                    <i className="bi bi-search text-dark"></i>
                  </button>
                </div>
              </form>
            </div>

            {/* Copyright */}
            <div className="small" style={{ color: '#878787' }}>
              City of New York. 2025 All Rights Reserved,<br />
              NYC is a trademark and service mark of the City of New York<br />
              <span className="text-decoration-underline">Privacy Policy</span>. <span className="text-decoration-underline">Terms of Use</span>.
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}

export default function Home() {
  return (
    <div className="bg-white">
      <HeaderTopBar />
      <MainNavbar />
      <HeroSection />
      <HowYouCanHelp />
      <ProgramsResources />
      <Footer />
    </div>
  );
}