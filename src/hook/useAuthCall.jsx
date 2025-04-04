// Custom Hook'lar, tekrar kullanılabilir ve modüler mantık oluşturmamızı
// sağlar.
// ✅ İsmi "use" ile başlamalı ve içinde React Hook kullanmalı.
// ✅ JSX döndürmez, sadece veri veya fonksiyon döndürür.
// ✅ Eğer başka dosyada kullanacaksan, export etmelisin.

import React from "react";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import useAxios from "./useAxios";

const useAuthCall = () => {
/* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  // const {axiosWithToken}=useAxios()

  const BASE_URL=import.meta.env.VITE_BASE_URL

  /* -------------------------------------------------------------------------- */
  /*                              REGİSTER  İŞLEMİ                              */
  /* -------------------------------------------------------------------------- */
  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}users/`,
        userInfo
      );
      console.log(data);

      dispatch(registerSuccess(data));
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                LOGOUT İŞLEMİ                               */
  /* -------------------------------------------------------------------------- */
  const logout = async () => {
    dispatch(fetchStart());

    try {
      const {data}=await axios(
        `${BASE_URL}auth/logout`,
        {
          headers:{
            Authorization:`Token ${token}`
          }
        }
      )
      


      navigate("/");
      dispatch(logoutSuccess())
    } catch (error) {
      dispatch(fetchFail())
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                LOGIN İŞLEMİ                               */
  /* -------------------------------------------------------------------------- */
  const login = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axios.post(
        `${BASE_URL}auth/login`,
        userInfo
      );
      dispatch(loginSuccess(data))
      navigate("/stock")
    } catch (error) {
        dispatch(fetchFail())
        
    }
  };

  return { register, logout, login };
};

export default useAuthCall;
