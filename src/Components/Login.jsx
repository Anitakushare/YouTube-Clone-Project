import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../Context/AuthContext';
//user login Page
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
// Handle form input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
// Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to login 
      const res = await api.post('/user/login', formData);
      if (res.data.user) {
        // If successful, save token and user info, update auth context and redirect
        localStorage.setItem('token', res.data.token);
        login(res.data.user, res.data.token);
        navigate('/');
      } else {
        setError('Login failed');
      }
    } catch (err) {
      // Show error message from server or generic message
      setError(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-md">
        <div className="flex justify-center mb-6">
             {/* Logo */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className="h-8"
          />
        </div>
        <h2 className="text-xl font-semibold text-center mb-4">Sign in to continue</h2>
          {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email address</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 border border-gray-300 px-3 py-2 rounded focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 border border-gray-300 px-3 py-2 rounded focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Sign in
          </button>
        </form>
        <p className="text-xs text-center mt-4 text-gray-500">
          Not a member? <Link href="/register" className="text-red-500">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
