import React from 'react'
import "./Signup.css"
import { Link } from 'react-router-dom'
import Art from "../../utils/Art.jpg"

const Signup = () => {
  return (
    <div className="signup-container">

     <div className="container-signup-form">

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
          <p>Register</p>
          <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password"/>
            <input type="password" placeholder="confirm Password"/>
            <button type="submit">Register</button>
          </form>
          <div className='right-box'>
          <span>
            Have an account ?
          </span>
            <Link to={"/"} > <button className="switch-btn">Login</button> </Link>
          </div>
        </div>
       
      </div>
    </div>
   </div>
  )
}

export default Signup