
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Jobs.css';

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

const Jobs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/views/jobpost/all`
        );

        console.log('API response:', response.data);

        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error('Expected an array of jobs:', response.data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-card">
      {posts.map((item) => (
        <div key={item.postId} className="job-item">
          <h3>
            <div>Domain:</div> {item.postProfile}
          </h3>

          <p>
            <div>Post Description:</div> {item.postDesc}
          </p>

          <p>
            <div>Required Experience:</div> {item.reqExperience}
          </p>

          <p>
            <div>Skills Required:</div>{' '}
            {Array.isArray(item.postTechStack)
              ? item.postTechStack.join(', ')
              : item.postTechStack}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
