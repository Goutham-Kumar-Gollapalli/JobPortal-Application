import React from 'react'
import axios from 'axios';
import { useState ,useEffect} from 'react';
import './Register.css';
const API_URL = import.meta.env.VITE_API_URL_LOCAL;

const Register = () => {
  console.log("API URL:", API_URL);
  const response=axios.post()
  const [jobpost,setJobpost]=useState({
    postProfile:"",
    postDesc:"",
    reqExperience:"",
    postTechStack:"",
});

function handleChange(e){
  setJobpost({
    ...jobpost,
    [e.target.name]:e.target.value
  })
  console.log(jobpost);  
}
async function handleSubmit(e){
  e.preventDefault();
  console.log("Data being sent:", jobpost);
  try {
    const response=await axios.post(
      'API_URL/jobpost/add',jobpost);
      if(response.ok)
      {
        alert("Job post Added Successfully");
      }
  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Backend error:", error.response?.data);
  }
  // console.log(fromSubmit);
}
  return (
    <div>
      <form className='register-form' onSubmit={handleSubmit}>
         <fieldset>
            <legend>Registration Form</legend>
              <div className='register'>
                <div>
                  <label>Profile</label>
                  <input name='postProfile' value={jobpost.postProfile} onChange={handleChange}></input>
                </div>
            <div>
              <label >Description</label>
            <input name='postDesc' onChange={handleChange} value={jobpost.postDesc}></input>
            </div>
            <div>
              <label >Required Experince</label>
              <input name='reqExperience' value={jobpost.reqExperience} onChange={handleChange}></input>
            </div>
            <div>
              <label >TechStack</label>
              <input name='postTechStack'value={jobpost.postTechStack}  onChange={handleChange}></input>
            </div>
              <button >Submit</button>
              </div>
          </fieldset>
      </form>
    </div>
  )
}

export default Register
