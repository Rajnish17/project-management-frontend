import React, { useState } from 'react';
import './Login.css'; // Import external CSS file
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import icons
import Art from "../../utils/Art.png";
import baseUrl from '../api';
import axios from 'axios';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate= useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${baseUrl}/user/login`, { email, password });
      // console.log(response.data.data.user._id);

      const {_id} =response.data.data.user;

      // console.log(_id);
      const {token} =response.data.data;
      
      localStorage.setItem("token",token);
      localStorage.setItem("userId",_id);
      setTimeout(()=>{
        navigate("/dashboard");
      },1000)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login. Please try again later.");
      } 
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-main">
      <div className="container">
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
            <p>Login</p>
            <form>
              <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" onClick={handleLogin}>Login</button>
            </form>
            <div className='right-box'>
              <span>Have no account yet?</span>
              <Link to={"/signup"}><button className="switch-btn">Register</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
