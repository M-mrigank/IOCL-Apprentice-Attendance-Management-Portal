import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Apprentice from "../Apprentice/Apprentice"
import DetailApprentice from '../Apprentice/DetailApprentice';
import { useLocation, useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";

const Dashboard = () => {

  const [isVisible, setIsVisible]=useState(false);
  const [enlargeData, setEnlargeData]=useState(null);

  const User=useSelector((state)=>(state.currentUserReducer));
  const location=useLocation();
  const navigate=useNavigate();
  useEffect(()=>{
    if(location.pathname==='/Dashboard' && User===null){
      navigate('/');
    }
  }, []);

  const popUpData=(data)=>{
    setEnlargeData(data);
    setIsVisible(true);
  }

  const closeEnlarge=()=>{
    setIsVisible(false);
    setEnlargeData(null);
  }
  

  // console.log("dashboard page user ", User);

  const apprenticeRecord=useSelector((state)=>(state.apprenticeRecordReducer));
  // console.log("record", apprenticeRecord);

  return (
    <div className={`flex flex-col w-full justify-center max-w-max mx-auto gap-y-4 mt-16 w-11/12 relative}`}>
      <p className="font-bold text-4xl text-zinc-700 max-w-max mx-auto">Apprentice and Administration Portal</p>
      <p className="max-w-max mx-auto text-4xl text-slate-600 font-bold mt-7">Welcome to Dashboard</p>
      <div className='flex flex-col max-w-max justify-center align-center max-w-max mx-auto min-w-[450px]'>
        {
          User?.user?.role==="admin" ?
            (<Apprentice popUpData={popUpData}/>):
            (<DetailApprentice user={User?.user} role={"apprentice"}/>)
        }
      </div>
      {
        isVisible && 
        <>
          <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black bg-opacity-60"></div>
          <div className='fixed top-0 left-0 w-[100%] min-h-screen flex justify-center align-center absolute max-w-max mx-auto' class="enlarge">
            <div  className="popup">
              <div  onClick={closeEnlarge} className='float-right p-3'><ImCross /></div>
              <DetailApprentice user={enlargeData} role={"apprentice"}/>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Dashboard