import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import toast from 'react-hot-toast';

export const sendotp=(authData, navigate)=>async(dispatch)=>{
    // console.log("data for sending otp1: ", authData);
    try{
        const {data}=await api.sendOtp(authData);
        // console.log("data for sending otp: ", data);
        dispatch({type:'AUTH', data});
        dispatch({type:'OTP', data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate("/verify-email");
    }catch(error){
        // toast.error("Failed to send OTP");
        toast.error(error?.response?.data?.message);
        console.log("OTP error: ", error);
    }
}

export const signup=(authData, navigate)=>async (dispatch)=>{
    // console.log("data for signup: ", authData.payload);
    try{
        const {data}=await api.signUp(authData.payload);
        // console.log("signup data: ", data);
        dispatch({type:'AUTH', data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        toast.success("Account Created!");
        navigate("/");
    }catch(error){
        toast.error(error?.response?.data?.message);
        console.log("error ->", error);
    }
}

export const login=(authData, navigate)=>async (dispatch)=>{
    try{
        const {data}=await api.logIn(authData);
        dispatch({type:'AUTH', data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        toast.success("Logged In");
        navigate('/');
    }catch(error){
        toast.error(error?.response?.data?.message);
        console.log("error ->",error);
    }
}