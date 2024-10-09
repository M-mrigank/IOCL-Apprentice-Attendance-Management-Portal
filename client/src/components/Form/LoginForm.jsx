import React, { useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {login} from "../../actions/auth";
import {useDispatch} from "react-redux";

const LoginForm = ({setIsLoggedIn}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [formData, setFormData]=useState({
        email:"", password:""
    });

    const [showPassword, setShowPassword]=useState(false);
    let bg=document.querySelector("#app");
    if(bg.classList.length>0){
        bg.classList.remove("bg-slate-400");
    }

    function changeHandler(event) {
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ));
    };

    function submitHandler(event){
        event.preventDefault();
        // console.log(formData);

        setIsLoggedIn(true);
        // toast.success("Logged In");

        dispatch(login(formData, navigate));
        // console.log(formData);

        // navigate("/Dashboard");
    }
  return (
    <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
        <label className='w-full'>
            <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>
                Email Address<sup className='text-red-600'>*</sup>
            </p>
            <input required type='email' value={formData.email} onChange={changeHandler} placeholder="Enter Email Address" name='email' className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
        </label>
        <label className='relative w-full'>
            <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>
                Password<sup className='text-red-600'>*</sup>
            </p>
            <input required type={showPassword?('text'):('password')} value={formData.password} onChange={changeHandler} placeholder="Enter Password" name='password' className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>

            <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute top-10 right-4 cursor-pointer'>
                {
                    showPassword?(<IoEyeOutline fontSize={24} fill='#595959'/>):(<FaRegEyeSlash fontSize={24} fill='#595959'/>)
                }
            </span>
            <Link to="/forgot-password">
                <p className='max-w-max text-xs mt-1 text-sky-500 ml-auto'>
                    Forgot Password
                </p>
            </Link>
        </label>
        <button className='rounded-[8px] font-medium bg-orange-300 px-[12px] py-[8px] mt-4 hover:bg-orange-400 hover:transition hover:duration-150'>
            Sign In
        </button>
    </form>
  )
}

export default LoginForm