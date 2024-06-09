import React from 'react'
import { useSelector } from 'react-redux'
import logo from "../../assets/iocl-nobg.png"
import rhino from "../../assets/rhino1.png"

const Home = () => {

  const user=useSelector((state)=>(state.currentUserReducer));

  return (
    <div className="flex flex-col w-4/5 gap-y-4 mt-32 max-w-max mx-auto justify-center align-center">

      <p className="font-bold text-4xl text-zinc-700 max-w-max mx-auto mt-6">Apprentice and Administration Portal</p>

      <p className="font-bold text-4xl text-zinc-500 max-w-max mx-auto mt-7">Welcome Back {
          user===null? (<></>):(<>
          <span className="text-orange-500">{user?.user?.firstName} {user?.user?.lastName}</span>

          </>)
        }</p>

      <div className='flex justify-between align-items'>
        <div className="flex flex-col justify-center align-center mt-9">

          <img src={logo} alt="IOCL"/>
          <p className="font-bold text-slate-700 text-2xl mt-4 flex justify-center">Barauni Refinery</p>

        </div>

        <div className='flex justify-center align-center'>
          <img src={rhino} alt="Rhino"/>
        </div>
      </div>
    </div>
  )
}

export default Home