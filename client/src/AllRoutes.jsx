import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';

const AllRoutes = ({setIsLoggedIn}) => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Auth" element={<Auth/>}/>
            <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/Signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes