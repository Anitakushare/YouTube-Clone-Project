// src/pages/AuthPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
   const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    avatar: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, userName, avatar } = formData;
      const endpoint = isLogin ? '/user/login' : '/user/register';
      const payload = isLogin ? { email, password } : { email, password, userName,avatar };
      const res = await api.post(endpoint, payload);
       if (res.data.user) {
        localStorage.setItem('token', res.data.token);
      login(res.data.user, res.data.token);

      console.log('User registered successfully!');
      navigate('/');
       }
       else{
        setError('Something went wrong');
       }
    } catch (err) {
        console.log(err)
      setError(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-sm bg-white p-8 rounded shadow-md">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube Logo"
          className="h-8"
        />
      </div>

      {/* Form Title */}
      <h2 className="text-xl font-semibold text-center mb-4">
        {isLogin ? 'Sign in to continue' : 'Create your account'}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username and Avatar for Register */}
        {!isLogin && (
          <>
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
          </>
        )}

        {/* Email */}
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

        {/* Password */}
        <div>
          <div className="flex justify-between text-sm font-medium">
            <label>Password</label>
            {isLogin && (
              <a href="#" className="text-red-400">
                Forgot password?
              </a>
            )}
          </div>
          <input
            type="password"
            name="password"
            className="w-full mt-1 border border-gray-300 px-3 py-2 rounded focus:outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          {isLogin ? 'Sign in' : 'Register'}
        </button>
      </form>

      {/* Switch between Sign in/Register */}
      <p className="text-xs text-center mt-4 text-gray-500">
        {isLogin ? 'Not a member?' : 'Already have an account?'}{' '}
        <span
          className="text-red-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Register now' : 'Sign in here'}
        </span>
      </p>
    </div>
  </div>
);

}
export default Login;
