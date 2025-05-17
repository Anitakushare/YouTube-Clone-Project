import { StrictMode } from 'react'
import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './Components/HomePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorHandler from './Components/ErrorHandler.jsx'
import { AuthProvider } from './Context/AuthContext.jsx';
import { GlobalContextProvider } from './Context/GlobalContext.jsx';
//import UploadVideo from './Components/UploadVideo.jsx';
// import CreateChannel from './Components/CreateChannel.jsx';
// import ChannelPage from './Components/ChannelPage.jsx';

const VideoPlayerPage = lazy(() => import('./Components/VideoPlayerPage.jsx'));
const Login = lazy(() => import('./Components/Login.jsx'));
const Register = lazy(() => import('./Components/Register.jsx'));
const CreateChannel = lazy(() => import('./Components/CreateChannel.jsx'));
const ChannelPage=lazy(()=>import('./Components/ChannelPage.jsx'));

const UploadVideo=lazy(()=>import('./Components/UploadVideo.jsx'));


const appRoute=createBrowserRouter([
  {
    path: "/",
    element:  <App />,
    children: [
      {
        index: true,
        element:       
            <HomePage />
      },
      {
        path: "/video/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VideoPlayerPage />
          </Suspense>
        ),
      },
      {
    path: "/CreateChannel",
    element: (<Suspense fallback={<div>Loading...</div>}>
        <CreateChannel />
      </Suspense>
    ),
  },
  {
    path: "/channel/:handle",
    element: (<Suspense fallback={<div>Loading...</div>}>
    
        <ChannelPage />
      </Suspense>
    ),
  },{
    path:"/channel/:handle/UploadVideo",
    element:(<Suspense fallback={<div>Loading...</div>}>
      <UploadVideo />
      </Suspense>)
  }
    ],
    errorElement: (
        <ErrorHandler />
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  
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
