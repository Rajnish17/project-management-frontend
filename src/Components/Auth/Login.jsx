import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Art from "../../utils/Art.png";
import baseUrl from '../api';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [password, setPassword] = useState('Demo12345');
  const [email, setEmail] = useState('Demo@gmail.com');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true at the start of login

    try {
      const response = await axios.post(`${baseUrl}/user/login`, { email, password });
      const { _id } = response.data.data.user;
      const { token } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", _id);
      toast.success("Login success");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login. Please try again later.");
      }
    } finally {
      setLoading(false); // Set loading to false after the login process
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2">
      <Toaster />

      {/* Left Side - Image Section */}
      <div className="hidden md:flex flex-col items-center justify-center bg-[#17A2B8] text-white p-8">
        <div className="w-3/4 mb-4">
          <img src={Art} alt="img" className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold">Welcome Aboard my friend</p>
          <p className="text-sm mt-1">Just a couple of clicks and we start</p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <p className="text-3xl font-bold text-gray-700">Login</p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <input
              type="text"
              placeholder="Email"
              value={email}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => { setEmail(e.target.value) }}
            />

            {/* Password Input */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg transition duration-200 ${
                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-4">
            <span className="text-gray-600">Have no account yet?</span>
            <Link to={"/signup"}>
              <button className="text-blue-500 hover:underline ml-2">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
