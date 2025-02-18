// Custom Hook'lar, tekrar kullanılabilir ve modüler mantık oluşturmamızı
// sağlar.
// ✅ İsmi "use" ile başlamalı ve içinde React Hook kullanmalı.
// ✅ JSX döndürmez, sadece veri veya fonksiyon döndürür.
// ✅ Eğer başka dosyada kullanacaksan, export etmelisin.



import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFail,fetchStart, registerSuccess,loginSuccess,logoutSuccess } from '../features/authSlice';
import{useNavigate} from "react-router-dom"
import axios from "axios"

const useAuthCall = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {token}=useSelector((state)=> state.auth);

    const register=async(userInfo)=>{
    dispatch(fetchStart());
    try {
        const {data}= await axios.post("https://18102.fullstack.clarusway.com/users/",userInfo);
        console.log(data)

        dispatch(registerSuccess(data));
        navigate("/stock");
    } catch (error) {
        dispatch(fetchFail())
    }
};


const logout = async()=>{
    dispatch(fetchStart())
    try {
        const {data}= await axios("https://stock-api-js.fullstack.clarusway.com/auth/logout",{
            headers:{
                Authorization:`Token ${token}`,
            },
        }) 
        navigate("/")
        dispatch(logoutSuccess())
        
    } catch (error) {
        dispatch(fetchFail())
    }
}

const login = async(userInfo)=>{
    dispatch(fetchStart())
    try {
        const{data}= await axios.post("https://18102.fullstack.clarusway.com/auth/login",userInfo)
        console.log("login data",data)
        dispatch(loginSuccess(data))
        navigate("/stock")
    } catch (error) {
        dispatch(fetchFail())
    }
}


  return {register, login, logout}
}

export default useAuthCall
