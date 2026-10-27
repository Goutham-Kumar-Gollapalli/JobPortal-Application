
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation
} from 'react-router-dom'

import Navbar from './component/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Jobs from './pages/Jobs'
import About from './pages/About'
import Signup from './pages/SignUp'
import Register from './pages/Register'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

// Protect pages based on the user's login and role
const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation()
  const token = sessionStorage.getItem('token')
  const role = sessionStorage.getItem('role')

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/jobs" replace />
  }

  return children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'jobs',
        element: <Jobs />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute allowedRoles={['EMPLOYER']}>
            <Register />
          </ProtectedRoute>
        )
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
