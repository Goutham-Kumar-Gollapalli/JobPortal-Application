import React from 'react'
import {
  createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom'

import Navbar from './component/Navbar'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import About from './pages/About'
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
        path: 'jobs',
        element: <Jobs />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App