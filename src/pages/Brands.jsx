import React from 'react'
import useStockCall from '../hook/useStockCall'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Container,Typography } from '@mui/material'
import { Button ,Grid} from "@mui/material";
import BrandsCard from '../components/Cards/BrandsCard'
import BrandsModal from "../components/Modal/BrandsModal" 


const Brands = () => {

  const {getStockData}=useStockCall()
const{brands}= useSelector((state)=> state.stock);


const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [initialState,setInitialState]=useState({
    name:"",
    image:""
  })

  useEffect(()=>{
    getStockData("brands")
  },[]);


  console.log("initialstate")

  return (
    <Container>
    <Typography variant="h4" color="secondary.second" align="center">
      Firms
    </Typography>
    <Button variant="contained"  onClick={handleOpen}  >NEW BRANDS</Button>
    <Grid container spacing={2} mt={2}>
      {brands.map((brands,index) => (
        <Grid item xs={12} md={6} lg={4} xl={3} key={index} >
        <BrandsCard  {...brands}  setInitialState={setInitialState} handleOpen={handleOpen}/>
        </Grid>
      ))}
    </Grid>

   {open && <BrandsModal  open={open}  handleClose={handleClose} initialState={initialState}   />} 

  </Container>
  )
}

export default Brands
