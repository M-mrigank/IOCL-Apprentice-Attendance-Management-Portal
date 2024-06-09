import React from 'react'
import Template from '../../components/Template/Template'
import loginImg from '../../assets/loginImg.jpg';

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