import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorHandler from './Components/ErrorHandler.jsx'
import Login from './Components/Login.jsx'
import { AuthProvider } from './Context/AuthContext.jsx';
import { GlobalContextProvider } from './Context/GlobalContext.jsx';
import Register from './Components/Register.jsx'
import VideoPlayerPage from './Components/VideoPlayerPage.jsx'
import HomePage from './Components/HomePage.jsx'
const appRoute=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[{
     index:true,
      element:<HomePage/>,
    },
  {
    path:"/video/:id",
    element:<VideoPlayerPage/>,
  },],
    errorElement:<ErrorHandler/>,

  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/Login",
    element:<Login/>,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GlobalContextProvider>
    <RouterProvider router={appRoute}/>
    </GlobalContextProvider>
    </AuthProvider>
  </StrictMode>,
)
