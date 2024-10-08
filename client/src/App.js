
import './App.css';
import AllRoutes from './AllRoutes';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllApprentice} from "./actions/apprentice";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  const dispatch=useDispatch();

  const User=useSelector((state)=>state.currentUserReducer);
  const [isLoggedIn, setIsLoggedIn]=useState(User!==null);

  useEffect(()=>{
    dispatch(fetchAllApprentice());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="964628402307-r5lht6hjd1l1nj75gslecdqrglvbe65a.apps.googleusercontent.com">
        <div id="app" className="bg-img w-screen min-h-screen flex flex-col bg-gradient-to-r from-slate-300">
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <div className="flex-grow pb-20">
              <AllRoutes setIsLoggedIn={setIsLoggedIn}/>
            </div>
          <footer className="w-full h-40 bg-red-300 flex flex-col justify-center items-center">
              <div className="w-full flex justify-center items-center">
                <p className='font-semibold text-lg'>Copyright <span className='text-blue-500'>©</span> IOCL Project || Barauni Refinery</p>
              </div>
            </footer>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
