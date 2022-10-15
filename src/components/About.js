import React from 'react'
import { Link } from "react-router-dom"


const About = () => {
  return (
    <div>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">About</h5>
          <p class="card-text">This is about section of iNotebook</p>
          <Link to="/" class="btn btn-dark">Home</Link>
        </div>
      </div>
    </div>
  )
}

export default About
