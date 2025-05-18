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

// Lazy load components to split code and improve initial load performance
const VideoPlayerPage = lazy(() => import('./Components/VideoPlayerPage.jsx'));
const Login = lazy(() => import('./Components/Login.jsx'));
const Register = lazy(() => import('./Components/Register.jsx'));
const CreateChannel = lazy(() => import('./Components/CreateChannel.jsx'));
const ChannelPage=lazy(()=>import('./Components/ChannelPage.jsx'));
const UploadVideo=lazy(()=>import('./Components/UploadVideo.jsx'));


const appRoute=createBrowserRouter([
  {
    path: "/",
    element:  <App />, // Main App component wrapping nested routes
    children: [
      {
        index: true,
        element:       
            <HomePage />,// Home page component (non-lazy loaded)
      },
      {
        path: "/video/:id", // Video player page with dynamic :id param
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VideoPlayerPage />
          </Suspense>
        ),
      },
      {
    path: "/CreateChannel",  // Create channel page route
    element: (<Suspense fallback={<div>Loading...</div>}>
        <CreateChannel />
      </Suspense>
    ),
  },
  {
    path: "/channel/:handle",  // Channel page with dynamic :handle param
    element: (<Suspense fallback={<div>Loading...</div>}>
    
        <ChannelPage />
      </Suspense>
    ),
  },{
    path:"/channel/:handle/UploadVideo",  // Upload video page under a channel
    element:(<Suspense fallback={<div>Loading...</div>}>
      <UploadVideo />
      </Suspense>)
  }
    ],//Fallback error UI for any errors in this route branch
    errorElement: (
        <ErrorHandler />
    ),
  },
  {
    path: "/register",  // Register page route outside main App layout
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/login",  // Login page route outside main App layout
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  
])
// Render the app root to the DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GlobalContextProvider>
    <RouterProvider router={appRoute}/>
    </GlobalContextProvider>
    </AuthProvider>
  </StrictMode>,
)
