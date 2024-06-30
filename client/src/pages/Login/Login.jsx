import React from 'react'
import Template from '../../components/Template/Template'
import loginImg from '../../assets/ioclLogin.png';

const Login = ({setIsLoggedIn}) => {
  return (
        <Template
        title="Welcome Back!"
        desc1=""
        desc2=""
        image={loginImg}
        formtype="login"
        setIsLoggedIn={setIsLoggedIn}
        />
  )
}

export default Login