import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Art from "../../utils/Art.png";
import axios from 'axios';
import baseUrl from "../api";
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); // Set loading to true when signup starts

    try {
      const response = await axios.post(`${baseUrl}/user/signup`, {
        fullName,
        email,
        password
      });

      if (response.data.success) {
        toast.success("Signup success", { duration: 1000 });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during signup.");
    } finally {
      setLoading(false); // Set loading to false after signup completes
    }
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-2">
      <Toaster />

      {/* Left Side - Image and Welcome Text */}
      <div className="hidden md:flex flex-col items-center justify-center bg-[#17A2B8] text-white p-8">
        <div className="w-3/4 mb-4">
          <img src={Art} alt="img" className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold">Welcome Aboard my friend</p>
          <p className="text-sm mt-1">Just a couple of clicks and we start</p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <p className="text-3xl font-bold text-gray-700">Register</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name Input */}
            <input 
              type="text" 
              placeholder="Name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email Input */}
            <input 
              type="text" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password Input */}
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Confirm Password Input */}
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Register Button */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-2 rounded-lg transition duration-200 ${
                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          
          {/* Login Link */}
          <div className="text-center mt-4">
            <span className="text-gray-600">Have an account?</span>
            <Link to={"/"}>
              <button className="text-blue-500 hover:underline ml-2">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
