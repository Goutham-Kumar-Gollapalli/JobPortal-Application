
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Jobs.css';

// const API_URL = import.meta.env.VITE_API_URL_LOCAL;
const API_URL = import.meta.env.VITE_API_URL;

const Jobs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/views/jobposts/all`
        );

        console.log('API response:', response.data);

        // Spring Boot ArrayList becomes a JavaScript array
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (posts.length === 0) {
    return <p>No jobs available.</p>;
  }

  return (
    <div className="job-card">
      {posts.map((item) => (
        <div key={item.postId} className="job-item">
          <h3>
            Domain: {item.postProfile}
          </h3>

          <p>
            <strong>Post Description:</strong>{' '}
            {item.postDesc}
          </p>

          <p>
            <strong>Required Experience:</strong>{' '}
            {item.reqExperience}
          </p>

          <p>
            <strong>Skills Required:</strong>{' '}
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
