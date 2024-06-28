import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Apprentice from "../Apprentice/Apprentice"
import DetailApprentice from '../Apprentice/DetailApprentice';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const User=useSelector((state)=>(state.currentUserReducer));
  const location=useLocation();
  const navigate=useNavigate();
  useEffect(()=>{
    if(location.pathname=='/Dashboard' && User==null){
      navigate('/');
    }
  }, [])
  

  // console.log("dashboard page user ", User);

  const apprenticeRecord=useSelector((state)=>(state.apprenticeRecordReducer));
  // console.log("record", apprenticeRecord);

  return (
    <div className="flex flex-col w-full justify-center max-w-max mx-auto gap-y-4 mt-16 w-11/12">
      <p className="font-bold text-4xl text-zinc-700 max-w-max mx-auto">Apprentice and Administration Portal</p>
      <p className="max-w-max mx-auto text-4xl text-slate-600 font-bold mt-7">Welcome to Dashboard</p>
      <div className='flex flex-col max-w-max justify-center align-center max-w-max mx-auto min-w-[450px]'>
        {
          User?.user?.role==="admin" ?
            (<Apprentice/>):
            (<DetailApprentice user={User?.user} role={"apprentice"}/>)
        }
      </div>
    </div>
  )
}

export default Dashboard