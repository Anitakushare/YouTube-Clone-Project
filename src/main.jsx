import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorHandler from './Components/ErrorHandler.jsx'
//import UserRegistration from './Components/UserLogin.jsx'

const appRoute=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    
    errorElement:<ErrorHandler/>
  },
  // {
  //   path:"/UserRegistration",
  //   element:<UserRegistration/>
  // },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRoute}/>
  </StrictMode>,
)
