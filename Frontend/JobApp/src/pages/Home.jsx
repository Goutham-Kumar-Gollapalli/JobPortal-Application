
import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <section className="home-content">
        <h1>Welcome to JobPortal</h1>

        <p>
          Find your dream job with JobPortal.
          Explore job opportunities and take the next step
          in your career.
        </p>

        <Link to="/jobs" className="home-button">
          Explore Jobs
        </Link>
      </section>

      <section className="home-features">
        <div className="feature">
          <h3>Find Jobs</h3>
          <p>Explore job opportunities that match your skills.</p>
        </div>

        <div className="feature">
          <h3>Easy to Use</h3>
          <p>Browse available jobs with a simple interface.</p>
        </div>

        <div className="feature">
          <h3>Build Your Career</h3>
          <p>Discover opportunities to grow professionally.</p>
        </div>
      </section>
    </div>
  )
}

export default Home
