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

const VideoPlayerPage = lazy(() => import('./Components/VideoPlayerPage.jsx'));
const Login = lazy(() => import('./Components/Login.jsx'));
const Register = lazy(() => import('./Components/Register.jsx'));

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
