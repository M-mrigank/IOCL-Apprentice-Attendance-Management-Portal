import React, { useEffect, useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {sendotp, signup} from "../../actions/auth"
import {useDispatch} from "react-redux";
import preloader from "../../assets/preloader-unscreen.gif";
import { fetchAllApprentice } from '../../actions/apprentice';

const SignupForm = ({setIsLoggedIn}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [formData, setFormData] =useState({
        firstName:"", lastName:"", email:"", password:"", confirmPassword:"", role:""
    });

    const [showPassword1, setShowPassword1]=useState(false);
    const [showPassword2, setShowPassword2]=useState(false);
    const [accountType, setAccountType]=useState("apprentice");
    let bg=document.querySelector("#app");

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

        // console.log(formData);
        
        dispatch(sendotp(formData, navigate));
        
        // dispatch(signup(formData, navigate));
        // toast.success("Account Created!");

        // navigate("/Dashboard");
    }
  return (
    <div className=''>

        <div className='flex p-1 gap-x-1 my-6 rounded-full max-w-max'>
            <button className={`${accountType==="apprentice"? "text-neutral-700 font-semibold bg-slate-300":"bg-transparent text-slate-950"} py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>{
                setAccountType("apprentice"); 
                if(bg.classList.length>0){
                    bg.classList.remove("bg-slate-400");
                };
            }} >
                Apprentice
            </button>
            <button className={`${accountType==="admin"? "text-neutral-700 font-semibold bg-slate-300":"bg-transparent text-slate-950"} py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>{
                setAccountType("admin");
                bg.classList.add("bg-slate-400"); 
            }} >
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
                <input required type="email" name="email" onChange={changeHandler} placeholder={`${accountType === "admin" ? 'Eg:abc@indianoil.in' : 'Eg:abc@gmail.com'}`} value={formData.email} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
            </label>

            <div className="w-full flex flex-col justify-between">
            <div className="w-full flex justify-between gap-x-4">
                <label className='relative w-full'>
                    <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>Create Password<sup className='text-red-600'>*</sup></p>
                    <input required type={showPassword1?("text"):("password")} name="password" onChange={changeHandler} placeholder="Enter Password" value={formData.password} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>

                    <span onClick={()=>setShowPassword1((prev)=>!prev)} className='absolute top-10 right-4 cursor-pointer'>
                        {
                            showPassword1?(<IoEyeOutline fill='#595959' fontSize={24}/>):(<FaRegEyeSlash fill='#595959' fontSize={24}/>)
                        }
                    </span>
                </label>
                <label className='relative w-full'>
                    <p className='text-[0.875rem] mb-1 leading-[1.375rem] font-semibold'>Confirm Password<sup className='text-red-600'>*</sup></p>
                    <input required type={showPassword2?("text"):("password")}  name="confirmPassword" onChange={changeHandler} placeholder="Confirm Password" value={formData.confirmPassword} className='rounded-[0.5rem] w-full p-[12px] border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>

                    <span onClick={()=>setShowPassword2((prev)=>!prev)} className='absolute top-10 right-4 cursor-pointer'>
                        {
                            showPassword2?(<IoEyeOutline fill='#595959' fontSize={24}/>):(<FaRegEyeSlash fill='#595959' fontSize={24}/>)
                        }
                    </span>
                </label>
            </div>
            <div>
                <ul className={`list-disc ml-5 mt-3 bg-white rounded-lg p-2`}>
                    <li className='text-sm text-slate-500'>Password should be atleast 8 characters long</li>
                    <li className='text-sm text-slate-500'>Password should contain atleast 1 upper case alphabet</li>
                    <li className='text-sm text-slate-500'>Password should contain atleast 1 lower case alphabet</li>
                    <li className='text-sm text-slate-500'>Password should contain atleast 1 special symbol</li>
                </ul>
            </div>
            </div>
            <button className='w-full rounded-[8px] font-medium bg-orange-300 px-[12px] py-[8px] mt-4 hover:bg-orange-400 hover:transition hover:duration-150'>
                Create Account
            </button>
        </form>
    </div>
  )
}

export default SignupForm