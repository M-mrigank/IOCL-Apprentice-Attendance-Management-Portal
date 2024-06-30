import React, { useEffect, useState } from 'react'
import OtpInput from "react-otp-input";
import { Link } from 'react-router-dom';
import { sendotp, signup } from '../../actions/auth';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { setCurrentUser } from '../../actions/currentUser';
import otpgif from "../../assets/otp-unscreen.gif";

const VerifyEmail = () => {

    const [otp, setOtp]=useState("");
    const signupData=useSelector((state)=>state.currentUserReducer);
    // console.log("signup data at verify email: ", signupData);


    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        if(!signupData){
            navigate("/Signup");
        }
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        // console.log("signup data at dispatch: ", signupData.payload);
        // console.log("otp-> ", otp);
        if(signupData.otp!==otp){
            toast.error("Please Enter correct OTP");
        }
        else dispatch(signup(signupData, navigate));
        // dispatch(signup(signupData.payload.firstName, signupData.payload.lastName, signupData.payload.email, signupData.payload.password, signupData.payload.confirmPassword, signupData.payload.role, otp, navigate));
    }

    const handleLogout =()=>{
        dispatch({
          type:'LOGOUT',
        });
        navigate('/Signup');
        dispatch(setCurrentUser(null));
      }
    
  return (
    <div className='w-4/5 mx-auto flex items-center justify-around'>
        <div className='w-[50%] mx-auto flex  items-center justify-center h-full pl-10'>
            <img src={otpgif} alt="OTP" class="w-full h-full object-cover block"/>
        </div>
        <div className='w-[50%] mx-auto flex flex-col items-center pr-10'>
            <h1 className='font-bold text-2xl text-slate-500 mt-10'>Verify Email</h1>
            <p className='mt-5 font-semibold text-slate-400'>An otp is send to your email, please enter the otp</p>
            <form onSubmit={handleSubmit} className='mt-5'>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props)=>(
                        <input
                            {...props}
                            placeholder='_'
                            style={{
                                boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-[48px] lg:w-[60px] border-0 rounded-[0.5rem] text-slate-700 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-orange-300"
                        />
                    )}
                    containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                    }}
                />
                <button
                type="submit"
                className='w-full rounded-[8px] font-medium bg-orange-300 px-[12px] py-[8px] mt-4 hover:bg-orange-400 hover:transition hover:duration-150'
                >
                Verify Email
                </button>
            <div className='flex gap-x-4 w-full'>
                <div className='w-full rounded-[8px] font-medium bg-red-300 px-[12px] py-[8px] mt-4 hover:bg-red-400 hover:transition hover:duration-150 mx-auto flex justify-center' onClick={handleLogout}>
                    <Link to={"/Signup"}>
                        <p>Back To Signup</p>
                    </Link>
                </div>
                <button className='w-full rounded-[8px] font-medium bg-orange-300 px-[12px] py-[8px] mt-4 hover:bg-orange-400 hover:transition hover:duration-150' onClick={()=>dispatch(sendotp(signupData.payload, navigate))}>Resend OTP</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default VerifyEmail