import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import logo from "../../assets/iocl-nobg.png"
import rhino from "../../assets/rhino1.png"
import preloader from "../../assets/preloader-unscreen.gif";

const Home = () => {

  var user=useSelector((state)=>(state.currentUserReducer));

  const [isVisible1, setIsVisible1]=useState(true);
  const [isVisible2, setIsVisible2]=useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible1(false);
      setIsVisible2(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);



  return (
    <div className="flex flex-col w-11/12 gap-y-4 max-w-maxContent mx-auto items-center justify-center align-center">

        {
          isVisible1 && (
            <div className='max-w-max mx-auto flex flex-col justify-center align-center items-center min-h-screen'>
              <div className='flex justify-center align-center'>
                <img src={preloader} alt="IOCL"/>
              </div>
              <h1 className='font-semibold text-2xl'>Loading..</h1>
            </div>)
        }
        {
          isVisible2 && (<>
            <p className="font-bold text-4xl text-zinc-700 max-w-max mx-auto mt-16">Apprentice and Administration Portal</p>

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
          </>)
        }
    </div>
  )
}

export default Home