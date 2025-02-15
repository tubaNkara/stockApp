import React from 'react'
import useDispatch from "react-redux";
import {fetchFail,fetchStart} from "./features/authSlice"

const RegisterCall = () => {
const dispatch=useDispatch()

  const register=async(userInfo)=>{
    
    dispatch(fetchStart())

    try {
      const {data}=await axios.post("https://18102.fullstack.clarusway.com/users/", userInfo)
      
    } catch (error) {
      dispatch(fetchFail())
    }
  }

  return {register}

}

export default RegisterCall

