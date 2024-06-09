import React, { useEffect, useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {signup} from "../../actions/auth"
import {useDispatch} from "react-redux";
import { fetchAllApprentice } from '../../actions/apprentice';

const SignupForm = ({setIsLoggedIn}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [formData, setFormData] =useState({
        firstName:"", lastName:"", email:"", password:"", confirmPassword:"", role:""
    });

    const [showPassword, setShowPassword]=useState(false);
    const [accountType, setAccountType]=useState("apprentice");

    // formData.role=accountType;

    // useEffect(()=>{
    //     dispatch(fetchAllApprentice());
    // }, [dispatch]);

    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ))
    }

    function submitHandler(event){
        event.preventDefault();
        if(formData.password!==formData.confirmPassword){
            toast.error("Password does not match");
            return;
        }

        setIsLoggedIn(true);
        formData.role=accountType;

        console.log(formData);
        
        dispatch(signup(formData, navigate));
        toast.success("Account Created!");

        // navigate("/Dashboard");
    }
  return (
    <div className=''>
        <div className='flex p-1 gap-x-1 my-6 rounded-full max-w-max'>
            <button className={`${accountType==="apprentice"? "text-neutral-700 font-semibold bg-slate-300":"bg-transparent text-slate-950"} py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>setAccountType("apprentice")} >
                Apprentice
            </button>
            <button className={`${accountType==="admin"? "text-neutral-700 font-semibold bg-slate-300":"bg-transparent text-slate-950"} py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>setAccountType("admin")} >
                Admin
            </button>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
            <div className='w-full flex justify-between gap-x-4'>
                <label className='w-full'>
                    <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>First Name<sup className='text-red-600'>*</sup></p>
                    <input required type="text" name="firstName" onChange={changeHandler} placeholder="Enter First Name" value={formData.firstName} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
                </label>
                <label className='w-full'>
                    <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>Last Name<sup className='text-red-600'>*</sup></p>
                    <input required type="text" name="lastName" onChange={changeHandler} placeholder="Enter Last Name" value={formData.lastName} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
                </label>
            </div>

            <label className='w-full'>
                <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>Email Address<sup className='text-red-600'>*</sup></p>
                <input required type="email" name="email" onChange={changeHandler} placeholder="Enter Email Address" value={formData.email} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
            </label>

            <div className="w-full flex justify-between gap-x-4">
                <label className='relative w-full'>
                    <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>Create Password<sup className='text-red-600'>*</sup></p>
                    <input required type={showPassword?("text"):("password")} name="password" onChange={changeHandler} placeholder="Enter Password" value={formData.password} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>

                    <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute top-10 right-4 cursor-pointer'>
                        {
                            showPassword?(<IoEyeOutline fill='#595959' fontSize={24}/>):(<FaRegEyeSlash fill='#595959' fontSize={24}/>)
                        }
                    </span>
                </label>
                <label className='relative w-full'>
                    <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>Confirm Password<sup className='text-red-600'>*</sup></p>
                    <input required type={showPassword?("text"):("password")}  name="confirmPassword" onChange={changeHandler} placeholder="Confirm Password" value={formData.confirmPassword} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>

                    <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute top-10 right-4 cursor-pointer'>
                        {
                            showPassword?(<IoEyeOutline fill='#595959' fontSize={24}/>):(<FaRegEyeSlash fill='#595959' fontSize={24}/>)
                        }
                    </span>
                </label>
            </div>
            <button className='w-full rounded-[8px] font-medium bg-orange-300 px-[12px] py-[8px] mt-4 hover:bg-orange-400 hover:transition hover:duration-150'>
                Create Account
            </button>
        </form>
    </div>
  )
}

export default SignupForm