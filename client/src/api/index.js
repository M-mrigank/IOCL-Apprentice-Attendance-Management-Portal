import axios from 'axios';

const API=axios.create({baseURL:'http://localhost:4000'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('Profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn=(authData)=>API.post('/api/v1/Login', authData);
export const signUp=(authData)=>API.post('/api/v1/Signup', authData);

export const fetchAllApprenticeRecord=()=>API.get('/api/v1/Record');
export const updateProfile=(id, updatedProfile)=>API.patch(`/update/${id}`);