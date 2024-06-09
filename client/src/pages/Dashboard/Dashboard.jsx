import React from 'react'
import { useSelector } from 'react-redux'
import Apprentice from "../Apprentice/Apprentice"

const Dashboard = () => {
  const User=useSelector((state)=>(state.currentUserReducer));

  console.log("dashboard page user ", User);

  const apprenticeRecord=useSelector((state)=>(state.apprenticeRecordReducer));
  console.log("record", apprenticeRecord);

  return (
    <div className="flex flex-col w-full justify-center max-w-max mx-auto gap-y-4 mt-28 w-4/5">
      <p className="font-bold text-4xl text-zinc-700 max-w-max mx-auto mt-10">Apprentice and Administration Portal</p>
      <p className="max-w-max mx-auto text-4xl text-slate-600 font-bold mt-7">Welcome to Dashboard</p>
      <div className='flex flex-col max-w-max justify-center align-center max-w-max mx-auto min-w-[450px]'>
        {
          User?.user?.role==="admin" &&
            <Apprentice/>
        }
      </div>
    </div>
  )
}

export default Dashboard