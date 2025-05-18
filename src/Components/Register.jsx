// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  //Form state for user input
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    avatar: ''
  });
  const [error, setError] = useState('');
   // Hook to navigate after successful registration
  const navigate = useNavigate();
 // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
// Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to register user
      const res = await api.post('/user/register', formData);
      console.log(res)
      if (res.data){
 // Navigate to login page on success
        navigate('/login');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      // Display error message from response 
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-md">
        <div className="flex justify-center mb-6">
            {/* YouTube logo */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className="h-8"
          />
        </div>
        {/* Registration form */}
        <h2 className="text-xl font-semibold text-center mb-4">Create your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="userName"
              className="w-full mt-1 border border-gray-300 px-3 py-2 rounded focus:outline-none"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Avatar URL</label>
            <input
              type="text"
              name="avatar"
              className="w-full mt-1 border border-gray-300 px-3 py-2 rounded focus:outline-none"
              value={formData.avatar}
              onChange={handleChange}
              required
            />
          </div>
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
            {/* Display error if any */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Register
          </button>
        </form>
        <p className="text-xs text-center mt-4 text-gray-500">
          Already have an account? <Link href="/login" className="text-red-500">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
