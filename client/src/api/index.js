import axios from 'axios';

// const API=axios.create({baseURL:'http://localhost:4000'});
const API=axios.create({baseURL:'https://iocl-apprentice-attendance-management.onrender.com'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('Profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn=(authData)=>API.post('/api/v1/Login', authData);
export const signUp=(authData)=>API.post('/api/v1/Signup', authData);

export const sendOtp=(authData)=>API.post('/api/v1/sendOtp', authData);

export const fetchAllApprenticeRecord=()=>API.get('/api/v1/Record');
export const updateProfile=(id, updatedProfile)=>API.patch(`/update/${id}`);