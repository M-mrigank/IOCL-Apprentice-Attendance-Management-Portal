import React from 'react'
import signupImg from '../../assets/signup.avif';
import Template from '../../components/Template/Template';

const Signup = ({setIsLoggedIn}) => {
  return (
        <Template
        title="Welcome Back!"
        desc1=""
        desc2=""
        image={signupImg}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}
        />
  )
}

export default Signup