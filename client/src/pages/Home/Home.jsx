import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import logo from "../../assets/iocl-nobg.png"
import rhino from "../../assets/rhino1.png"
import preloader from "../../assets/preloader-unscreen.gif";
import workers from "../../assets/att3.webp";
import security from "../../assets/att4.webp";
import verify from "../../assets/verify.webp"
import check from "../../assets/att8.gif";

const Home = () => {

  var user=useSelector((state)=>(state.currentUserReducer));

  const [isVisible1, setIsVisible1]=useState(true);
  const [isVisible2, setIsVisible2]=useState(false);
  const [currImg, setCurrImg]=useState(0);
  const [dir, setDir]=useState('');

  let bg=document.querySelector("#app");
  if(bg && bg.classList.length>0 && user!==null && user?.user?.accountType!=="admin"){
    bg.classList.remove("bg-slate-400");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible1(false);
      setIsVisible2(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const direction=[
    'translate-x-full', 
    '-translate-x-full', 
    'translate-y-full',  
    '-translate-y-full',
  ]
  const images=[
    workers,
    security,
    verify
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * direction.length);
      setDir(direction[randomIndex].class);
      setCurrImg((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); 

    return () => clearInterval(interval);
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
            <div className='pt-10 flex flex-col justify-center items-center w-full'>
              <span className='text-slate-700 italic font-bold text-2xl'>Real-Time Attendance for a Smarter Workforce!</span>

              <div className="rounded-lg shadow-2xl pt-4 relative w-[50%] h-96 overflow-hidden">
                <div  className='w-28 z-20 absolute z-20'><img src={check}/></div>
                <div
                  className={`rounded-lg absolute w-full h-full transition-transform duration-700 ease-in-out transform ${currImg > 0 ? direction[(currImg - 1) % direction.length].class : ''}`}
                >
                  <img
                    src={images[(currImg - 1 + images.length) % images.length]}
                    alt={`Slide ${(currImg - 1 + images.length) % images.length + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div
                  className={`rounded-lg absolute w-full h-full transition-transform duration-700 ease-in-out transform ${dir} ${currImg === 0 ? 'translate-x-0' : ''}`}
                >
                  <img
                    src={images[currImg]}
                    alt={`Slide ${currImg + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </>)
        }
    </div>
  )
}

export default Home