import React from 'react';
import './Login.css'; // Import external CSS file
import { Link } from 'react-router-dom';
import Art from "../../utils/Art.jpg"

const Login = () => {
  return (
   <div className="main-container">

     <div className="container">

      <div className="left-side">
        <div className='left-image'>
          <img src={Art} alt="img" />
        </div>
        <div className='left-side-paragraph'>
        <span className='paragraph'>Welcome Aboard my friend  <br/>
        </span>
        <span>just a couple of clicks and we start</span>
        </div>
      </div>

      <div className="right-side">
      
        <div className="login-side">
          <p>Login</p>
          <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password"/>
            <button type="submit">Login</button>
          </form>
          <div className='right-box'>
          <span>
            Have no account yet?
          </span>
            <Link to={"/signup"} > <button className="switch-btn">Register</button> </Link>
          </div>
        </div>
       
      </div>
    </div>
   </div>


  );
};

export default Login;
