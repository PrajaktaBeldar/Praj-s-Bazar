import React, { Fragment, useEffect} from "react";
import "./Home.css";
import Card from "./Card.js";
import Label from "../layout/Label";
import {  clearErrors ,getProduct } from "../../allActions/productAction";
import {  useDispatch, useSelector} from "react-redux";
import Swal  from "sweetalert2"; 
import Wait from "../layout/Waiting/Wait";
 
const Home = () => {       
  
 const dispatch=useDispatch();
const {loading, error, products } =useSelector((state) => state.products);
  useEffect(()=>{
    if (error) {
      Swal.fire({ 
        text: 'error occur'
      })
 
      dispatch(clearErrors());
    } 
    dispatch(getProduct()); 
  },[dispatch,error])
 
  return ( 
       
        <Fragment> 
         { loading ? 
         ( <Wait/> ) : ( <Fragment>  
  
            <Label title="ECOMMERCE" />  
             <div className="homeMainPage">
            <p>Welcome to <span>Praj's Bazar </span> </p> 
            <h1>It's time to <b className="b">Shopping!!!</b> </h1>
            </div>
          <h2 className="heading">Products</h2> 

          <div className="homeContainer" > 
            { 
              products && products.map((product, index) => (
                <Card product={product} index={index} /> 
              ))
            } 
           </div>
        </Fragment> )}

        </Fragment>
   
  );
};

export default Home;
