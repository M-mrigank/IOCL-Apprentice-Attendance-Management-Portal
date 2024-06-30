import React, { useState } from 'react'
import {useDispatch} from "react-redux";
import lft from "../../assets/passReset-unscreen.gif";
import rgt from "../../assets/passReset1-unscreen.gif";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast"
import { resetPasswordToken } from '../../actions/password';

const ForgotPassword = () => {
    const [sendEmail, setSendEmail] =useState(false);
    const [email, setEmail] = useState("");

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();

        dispatch(resetPasswordToken(email, setSendEmail));
    }

  return (
    <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col">
            <h1 className='flex justify-center items-center font-bold text-4xl mt-16 text-slate-700'>
                {
                    !sendEmail ? "Reset Your Password" : 
                    `Check Your Email`
                }
            </h1>
            <p className='flex justify-center items-center font-bold text-lg mt-6 text-slate-500'>
                {
                    !sendEmail?"Forgot your password? Don't worry we will send you email with a link to reset your password" : `We have send reset link at ${email}`
                }
            </p>
        </div>
        <div className="flex justify-center items-center flex-wrap">
            <div className="w-[30%]">
                <img src={lft} alt="Password Reset" />
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col w-[40%]'>
                {
                    !sendEmail && (
                        <label htmlFor="email">
                            <input required type="email" value={email} name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email Address' className='w-full rounded-[0.5rem] w-full p-4 border ring-1 focus:outline-none focus:border-orange-400 focus:ring-orange-500 focus-ring-1'/>
                        </label>
                    )
                }
                <div className='flex gap-x-4 w-full justify-around'>
                    <button type='submit' className='rounded-[8px] font-medium bg-orange-300 px-[12px] py-[8px] mt-4 hover:bg-orange-400 hover:transition hover:duration-150 w-full'>
                        {
                            !sendEmail ? "Reset Password" : "Resent Email"
                        }
                    </button>

                    <div className='rounded-[8px] font-medium bg-orange-300 px-[12px] py-[8px] mt-4 hover:bg-orange-400 hover:transition hover:duration-150 flex justify-center items-center w-full'>
                        <Link to="/Login">
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            </form>
            <div className="w-[30%]">
                <img src={rgt} alt="Password Reset" />
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword