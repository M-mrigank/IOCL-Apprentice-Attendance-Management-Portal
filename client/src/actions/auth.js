import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import toast from 'react-hot-toast';

export const signup=(authData, navigate)=>async (dispatch)=>{
    try{
        const {data}=await api.signUp(authData);
        dispatch({type:'AUTH', data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        toast.success("Account Created!");
        navigate("/");
    }catch(error){
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
        console.log("error ->",error);
    }
}