import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Hotel from './pages/Hotel.tsx'
import Room from './pages/Room.tsx'
import RoomDetails from './pages/RoomDetails.tsx'
import Services from './pages/Services.tsx'
import Contact from './pages/Contact.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Hotel/>
      },
      {
        path:"/hotel",
        element:<Hotel/>
      },
      {
        path:"/room",
        element:<Room/>
      },
      {
        path: '/room/:roomId', 
        element: <RoomDetails />,
      },
      {
        path:"/services",
        element:<Services/>
      },
      {
        path:"/contact",
        element:<Contact/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
