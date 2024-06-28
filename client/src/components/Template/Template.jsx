import React from 'react'
import frame from '../../assets/frame.jpg'
import SignupForm from '../Form/SignupForm'
import LoginForm from '../Form/LoginForm'
import { FcGoogle } from "react-icons/fc";

const Template = ({title, desc1, desc2, image, formtype, setIsLoggedIn}) => {
  return (
    <div className="flex justify-between align-center pt-24 h-full w-4/5 max-w-[1160px] mx-auto py-12 gap-x-12 gap-y-0 max-[620px]:flex-wrap">
        <div className="relative w-4/5 max-w-[450px] pt-14">

            <img src={frame} alt="Frame" width={558} height={400} loading='lazy' className='h-[90%]'/>

            <img src={image} alt="Frame" width={554} height={581} loading='lazy' className='absolute top-6 left-6 h-[80%]'/>

        </div>
        <div className="w-4/5 max-w-[450px] mx-0">
            <h1 className='font-bold text-[1.875rem] leading-[2.3rem]'>{title}</h1>
            <p className='text-[1.125rem] leading-[1.625rem] mt-4 flex'>
                <span className='font-semibold'>{desc1}</span>
                <br/>
                <span className='text-orange-400'>{desc2}</span>
            </p>

            {formtype==="signup"?(<SignupForm setIsLoggedIn={setIsLoggedIn}/>):(<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}
            <div className='flex flex-row w-full items-center my-4 gap-x-2'>
                <div className='h-[1px] bg-slate-700 w-full'></div>
                <div className='font-medium leading-[1.375rem] text-stone-800'>OR</div>
                <div  className='h-[1px] bg-slate-700 w-full'></div>
            </div>
            <button className='flex w-full justify-center rounded-[8px] font-medium text-stone-800 border border-zinc-50 align-baseline px-[12px] py-[8px] gap-x-2 mt-6 ring-2'>
                <div className='flex justify-center items-center align-center pt-1'><FcGoogle/></div>
                <p>Signup with Google</p>
            </button>
        </div>

    </div>
  )
}

export default Template