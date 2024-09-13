import React from 'react'
import signupImg from '../../assets/ioclSignup-removebg-preview.png';
import Template from '../../components/Template/Template';

const Signup = ({setIsLoggedIn}) => {
  return (
        <Template
        title="Welcome Back!"
        image={signupImg}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}
        />
  )
}

export default Signup