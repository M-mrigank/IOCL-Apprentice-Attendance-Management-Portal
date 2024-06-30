import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import resetLft from "../../assets/resetPass1-unscreen.gif"
import resetImg from "../../assets/resetPass-unscreen.gif"
import { resetPassword } from '../../actions/password';

const ResetPassword = () => {
    const [formData, setFormData]=useState({
        password:"",
        confirmPassword:"",
        token:""
    });
    const dispatch=useDispatch();
    const location=useLocation();
    const navigate=useNavigate();
    const [passVisible, setPassVisible]=useState(false);
    const [confPassVisible, setConfPassVisible]=useState(false);
    const[isVisible1, setIsVisible1]=useState(false);
    const[isVisible2, setIsVisible2]=useState(false);

    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ))
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        formData.token=token;
        dispatch(resetPassword(formData, navigate));
    }

  return (
    <div className="w-11/12 mx-auto flex flex-col items-center">
        <h1 className='font-bold text-3xl mt-16 text-slate-700'>Reset Password</h1>
        <p className='text-slate-400 mt-3'>Create your new password</p>
        <div className='flex'>
            <div className='w-[60%]'>
                <img src={resetImg} alt="Password Reset" className="w-full h-full object-cover block"/>
            </div>
            <form className='flex flex-col w-[40%] justify-center items-center gap-y-4' onSubmit={handleSubmit}>
                <label className='relative w-full'>
                    <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>Create Password<sup className='text-red-600'>*</sup></p>
                        <input required type={passVisible?("text"):("password")} name="password" onChange={changeHandler} placeholder="Enter Password" value={formData.password} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>

                        <span onClick={()=>setPassVisible((prev)=>!prev)} className='absolute top-10 right-4 cursor-pointer'>
                            {
                                passVisible?(<IoEyeOutline fill='#595959' fontSize={24}/>):(<FaRegEyeSlash fill='#595959' fontSize={24}/>)
                            }
                        </span>
                    </label>
                    <label className='relative w-full'>
                        <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>Confirm Password<sup className='text-red-600'>*</sup></p>
                        <input required type={confPassVisible?("text"):("password")}  name="confirmPassword" onChange={changeHandler} placeholder="Confirm Password" value={formData.confirmPassword} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>

                        <span onClick={()=>setConfPassVisible((prev)=>!prev)} className='absolute top-10 right-4 cursor-pointer'>
                            {
                                confPassVisible?(<IoEyeOutline fill='#595959' fontSize={24}/>):(<FaRegEyeSlash fill='#595959' fontSize={24}/>)
                            }
                        </span>
                    </label>
                    <button type="submit" className='w-full rounded-[8px] font-medium bg-orange-300 px-[12px] py-[8px] mt-4 hover:bg-orange-400 hover:transition hover:duration-150'>
                        Reset Password
                    </button>
            </form>
        </div>
    </div>
  )
}

export default ResetPassword