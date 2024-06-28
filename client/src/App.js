
import './App.css';
import AllRoutes from './AllRoutes';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllApprentice} from "./actions/apprentice"

function App() {

  const dispatch=useDispatch();

  const User=useSelector((state)=>state.currentUserReducer);
  const [isLoggedIn, setIsLoggedIn]=useState(User!==null);

  useEffect(()=>{
    dispatch(fetchAllApprentice());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="bg-img w-screen min-h-screen flex flex-col bg-gradient-to-r from-slate-300">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <AllRoutes setIsLoggedIn={setIsLoggedIn}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
