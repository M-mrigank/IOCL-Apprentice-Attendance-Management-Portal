import * as api from "../api";

export const fetchAllApprentice=()=>async(dispatch)=>{
    try{
        const {data}=await api.fetchAllApprenticeRecord();
        dispatch({
            type: "FETCH_APPRENTICE",
            payload:data,
        });

    }catch(error){
        console.log("error->", error);
    }
}

export const updateProfile=(id, updateData)=>async(dispatch)=>{
    try{
        const {data}=await api.updateProfile(id, updateData);
        dispatch({
            type:"UPDATE_CURRENT_APPRENTICE",
            payload:data,
        });

    }catch(error){
        console.log("error->", error);
    }
}