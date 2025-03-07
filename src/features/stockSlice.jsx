import { createSlice } from '@reduxjs/toolkit';

const stockSlice=createSlice({
    name:"stock",
    initialState:{
        loading:false,
        error:false,
        token:null, 
        firms:[],
        brands:[],
        products:[],
        purchases:[],
        sales:[],
        categories:[]
    },
    reducers:{
        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
          },
          fetchFail: (state) => {
            state.loading = false;
            state.error = true;
          },
          // firmSuccess:(state, {payload})=>{
          //   console.log("firmsuccess oldu");
          //   state.firms= payload.data
          //   state.loading = false;
          //   state.error = false;
          // },

          stockSuccess: (state, {payload})=>{
            state[payload.url] = payload.data.data;
            state.loading=false;
            state.error=false;
          },

// promise all sonrası
          getProCatBrandSuccess: (state, {payload})=>{
            console.log("payload", payload);
            state.loading=false;
            state.products=payload[0]
            state.categories=payload[1]
            state.brands=payload[2]
            
          },

          getPurcBrandProSuccess: (state, {payload})=>{
            console.log("payload",payload);
            state.loading=false;
            state.purchases=payload[0]
            state.brands=payload[1]
            state.products=payload[2]
            state.firms=payload[3]
          },
          
    },

});

export const { fetchStart, fetchFail, stockSuccess, getProCatBrandSuccess,getPurcBrandProSuccess}=stockSlice.actions;


export default stockSlice.reducer;