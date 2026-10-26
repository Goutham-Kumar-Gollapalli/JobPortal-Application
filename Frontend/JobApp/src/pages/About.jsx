import React from 'react'
import "./About.css"
import {Search,Users,Building2,FileCheck,Handshake,Target} from 'lucide-react'
const About = () => {
  return (
    <div>
      <div className='head'>
        <h1>About JobPortal</h1>
        <p className='para1'>Connecting talent with opportunity.</p>
        <p className='para2'>A smarter way to discover jobs and connect employers with skilled candidates.</p>
      </div>
      
      <div className='mission'>
        <Target size={36} color='#2563EB'/>
        <h2>Our Mission</h2>
        <p>Make job discovery and recruitment simple, accessible, and efficient.</p>
      </div>

      <div className='offer'>
        <h2>What We Offer</h2>
        <div className='offer-items'>
          <div className='item-1'>
            <Search size={36} color='#2563EB'/>
            <b>Find Jobs</b>
            <p>Explore career opportunities.</p>
          </div>
          <div className='item-2'>
            <FileCheck size={36} color='#2563EB'/>
            <b>Apply Easily</b>
            <p>Manage job applications.</p>
          </div>
          <div className='item-3'>
            <Users size={36} color='#2563EB'/>
            <b>Find Employees</b>
            <p>Connect with skilled candidates.</p>
          </div>
          <div className='item-4'>
            <Building2 size={36} color='#2563EB'/>
            <b>Explore Companies</b>
            <p>Discover companies and workplaces</p>
          </div>
        </div>
        <div>
          <Handshake size={36} color='#2563EB'/>
          <h2>Our Vision</h2>
          <p>To create a convenient platform where the right talent meets the right opportunity.</p>
        </div>
      </div>

    </div>
  )
}

export default About