import React, { useState } from 'react'
import './Auth.css'
import iocl from '../../assets/iocl.png'
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const Auth = () => {
  const [isSignedUp, setIsSignedUp]=useState(false);
  return (
    <section classname="auth-section">
      <div classname="auth-container">
        {!isSignedUp ? <Signup/> : <Login/>}
      </div>
    </section>
  )
}

export default Auth