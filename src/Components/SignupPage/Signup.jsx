import React, { useState } from 'react';
import "./Signup.css";
import { Link, useNavigate } from 'react-router-dom';
import Art from "../../utils/Art.jpg";
import axios from 'axios';
import baseUrl from "../api"

const Signup = () => {
  const [fullName, setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/user/signup`, {
        fullName,
        email,
        password
      });

      if (response.data.success) {
        navigate("/");
        return;
      }

    } catch (error) {
      // console.error("Registration error:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="container-signup-form">
        <div className="left-side">
          <div className='left-image'>
            <img src={Art} alt="img" />
          </div>
          <div className='left-side-paragraph'>
            <span className='paragraph'>Welcome Aboard my friend  <br /></span>
            <span>just a couple of clicks and we start</span>
          </div>
        </div>

        <div className="right-side">
          <div className="login-side">
            <p>Register</p>
            <form onSubmit={handleSignup}>
              <input type="text" placeholder="Name" value={fullName} onChange={(e) => setfullName(e.target.value)} />
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <button type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <div className='right-box'>
              <span>Have an account ?</span>
              <Link to={"/"}><button className="switch-btn">Login</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
