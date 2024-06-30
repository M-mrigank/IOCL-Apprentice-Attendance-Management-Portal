import * as api from "../api";
import toast from 'react-hot-toast';

export const resetPasswordToken=(authData, setSendEmail)=>async(dispatch)=>{
    // console.log("reset password token data: ", authData);
    try{
        const {data}=await api.resetPasswordToken({authData});
        console.log("reset password data from backend: ", data);


        setSendEmail(true);
        toast.success("Reset link send to Email");
    }catch(error){
        toast.error(error?.response?.data?.message);
        console.log("password reset token error: ", error);
    }
}

export const resetPassword=(authData, navigate)=>async(dispatch)=>{
    // console.log("reset password data: ", authData);
    try{
        const {data}=await api.resetPassword(authData);
        toast.success("Password Updated Successfully");
        navigate("/Login");
    }catch(error){
        toast.error(error?.response?.data?.message);
        console.log("password reset error: ", error);
    }
}