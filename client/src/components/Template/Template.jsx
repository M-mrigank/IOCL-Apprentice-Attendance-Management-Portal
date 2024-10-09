import React from 'react';
import axios, { formToJSON } from 'axios';
import SignupForm from '../Form/SignupForm';
import LoginForm from '../Form/LoginForm';
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

import {useDispatch} from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { logininWithGoogle, signinWithGoogle, signup } from '../../actions/auth';

const Template = ({title, desc1, desc2, image, formtype, setIsLoggedIn}) => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const  signInWithGoogle=useGoogleLogin({
        onSuccess: async (response)=>{
            try{
                const res=await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers:{
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                console.log(res);
                dispatch(signinWithGoogle(res?.data, navigate));
            }
            catch(error){
                return response.status(404).json({
                    success:false,
                    message:"Failed to Signup with Google!",
                })
            }
        }
    });

    const logInWithGoogle=useGoogleLogin({
        onSuccess: async (response)=>{
            try{
                const res=await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers:{
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                console.log(res);
                dispatch(logininWithGoogle(res?.data, navigate));
            }
            catch(error){
                return response.status(404).json({
                    success:false,
                    message:"Failed to Signup with Google!",
                })
            }
        }
    })
  return (
    <div className="flex justify-between align-center pt-24 h-full w-4/5 max-w-[1160px] mx-auto py-12 gap-x-12 gap-y-0 max-[620px]:flex-wrap">
        <div className="relative w-4/5 max-w-[450px] pt-14">
            <img src={image} alt="Frame" width={560} height={581} loading='lazy' className='absolute top-6 left-6 h-full w-full'/>

        </div>
        <div className="w-4/5 max-w-[450px] mx-0">
            <h1 className='font-bold text-[1.875rem] leading-[2.3rem]'>{title}</h1>

            {formtype==="signup"?(<SignupForm setIsLoggedIn={setIsLoggedIn}/>):(<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}
            <div className='flex flex-row w-full items-center my-4 gap-x-2'>
                <div className='h-[1px] bg-slate-700 w-full'></div>
                <div className='font-medium leading-[1.375rem] text-stone-800'>OR</div>
                <div  className='h-[1px] bg-slate-700 w-full'></div>
            </div>
            <button className='flex w-full justify-center rounded-[8px] font-medium text-stone-800 border border-zinc-50 align-baseline px-[12px] py-[8px] gap-x-2 mt-6 ring-2' 
                    onClick={() => {
                        formtype === "signup" ? signInWithGoogle() : logInWithGoogle();
                    }}>
                <div className='flex justify-center items-center align-center pt-1'><FcGoogle/></div>
                {
                    formtype==="signup" && <p>Sign In with Google</p>
                }
                {
                    formtype==="login" && <p>Log In with Google</p>
                }
            </button>
        </div>

    </div>
  )
}

export default Template