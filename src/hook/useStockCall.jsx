import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, stockSuccess, getProCatBrandSuccess} from "../features/stockSlice"
import axios from "axios";
import { useSelector } from "react-redux";
import useAxios from "./useAxios";


const useStockCall = () => {
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { token } = useSelector((state) => state.auth);
  const {axiosWithToken}=useAxios()
  /* -------------------------------------------------------------------------- */
  // const getFirms=async()=>{
  //     dispatch(fetchStart())
  //     try {
  //         const {data} = await axios(`${BASE_URL}firms`,
  //             {
  //                 headers: {
  //                   Authorization:`Token ${token}`,
  //                 },
  //               }
  //         )
  //         console.log(data)
  //         dispatch(firmSuccess(data))
  //     } catch (error) {
  //     dispatch(fetchFail())
  //     }

  // }

  // AxioswithTken yardımıyla veri çekme

  // const getFirms = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axiosWithToken.get("firms")
       
  //     console.log(data);
  //     dispatch(firmSuccess(data));
  //   } catch (error) {
  //     dispatch(fetchFail());
  //   }
  // };


// GET DATA

  const getStockData=async(url)=>{
    dispatch(fetchStart());
    try {
      const {data}= await axiosWithToken.get(`${url}`)
      console.log(data, `${url}`)
      dispatch(stockSuccess({data,url}));
      
    } catch (error) {
      dispatch(fetchFail())
    }
  }

  


// DELETE DATA

const deleteStockData=async(url,id)=>{
dispatch(fetchStart());
try {
  const{data}=await axiosWithToken.delete(`${url}/${id}`)
  console.log(data)
} catch (error) {
  dispatch(fetchFail());

}}

const createStockData = async(url, info)=>{
  dispatch(fetchStart())
  try {
    const {data}=await axiosWithToken.post(url,info)
    console.log(data)
  } catch (error) {
    dispatch(fetchFail())
  }
}

// UPDATE DATA

const updateStockData=async()=>{
  dispatch(fetchStart())
  try {
    const {data}=await axiosWithToken.put(`${url}/${info._id}`,info)
getStockData(url)
  } catch (error) {
    dispatch(fetchFail())
  }
}

const getProCatBrand=async()=>{
  dispatch(fetchStart());

  try {


    const [products,categories,brands]= await Promise.all([
      axiosWithToken("products"),
      axiosWithToken("categories"),
      axiosWithToken("brands"),
    ])
    console.log(products,categories,brands);
  dispatch(getProCatBrandSuccess([products?.data?.data,categories?.data?.data,brands?.data?.data]))

  } catch (error) {
    dispatch(fetchFail())
  }

};



const getPurcBrandPro=async()=>{
  dispatch(fetchStart());

  try {


    const [purchases,brands,products,firms]= await Promise.all([
      axiosWithToken("purchases"),
      axiosWithToken("brands"),
      axiosWithToken("products"),
      axiosWithToken("firms"),
      
    ]);
    console.log(purchases,brands,products);
  dispatch(getPurcBrandProSuccess(
                                 [purchases?.data?.data,
                                  brands?.data?.data,
                                  products?.data?.data,
                                  firms?.data?.data,]));

  } catch (error) {
    dispatch(fetchFail());
  }

};



return { getStockData, deleteStockData,createStockData,updateStockData,getProCatBrand ,getPurcBrandPro};

};


export default useStockCall;
