import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorHandler from './Components/ErrorHandler.jsx'
import Login from './Components/Login.jsx'
import { AuthProvider } from './Context/AuthContext';
import Register from './Components/Register.jsx'
import VideoPlayerPage from './Components/VideoPlayerPage.jsx'
const appRoute=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    
    errorElement:<ErrorHandler/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/Login",
    element:<Login/>
  },
  {
    path:"/video/:id",
    element:<VideoPlayerPage/>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={appRoute}/>
    </AuthProvider>
  </StrictMode>,
)
