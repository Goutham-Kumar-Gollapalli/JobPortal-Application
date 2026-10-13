import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import './Jobs.css'
const Jobs = () => {
  const [posts,setPosts]=useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/views/jobposts'
        );
        console.log(response.data);
        
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);
  
  return (
    <div className='job-card'>
      {posts.map((item)=>
        (
          <div key={posts.id} className='job-item'>
            <h3><div>Domain :</div> {item.postProfile}</h3>
            <p><div>post Description : </div>{item.postDesc}</p>
            <p><div>Req Exp :</div> {item.reqExperience}</p>
            <p><div>skills Required :</div> {item.postTechStack}</p>
          </div>
        ))}
    </div>
  )
}

export default Jobs
