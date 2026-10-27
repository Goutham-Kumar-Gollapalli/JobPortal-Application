
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')
  const role = sessionStorage.getItem('role')
  const isLoggedIn = Boolean(token)
  const isEmployer = isLoggedIn && role === 'EMPLOYER'

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('name')

    navigate('/login')
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        JobPortal
      </NavLink>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end>Home</NavLink>
        </li>

        <li>
          <NavLink to="/jobs">Job Posts</NavLink>
        </li>

        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        {isEmployer && (
          <li>
            <NavLink to="/register">Register Job</NavLink>
          </li>
        )}

        {!isLoggedIn ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>

            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        ) : (
          <li>
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
