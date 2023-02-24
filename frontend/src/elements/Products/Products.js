import React, { Fragment } from 'react';
import "./Products.css";
import Wait from '../layout/Waiting/Wait.js';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  clearErrors ,getProduct} from "../../allActions/productAction"; 
import Card from "../Home/Card.js";
import  {useParams}  from  "react-router-dom"; 
import Swal  from "sweetalert2"; 

const Products = () => {   
    const dispatch=useDispatch();  
  
    const {
      products,
      loading,
      error,
     
    } = useSelector((state) => state.products);
  
    const { keyword } = useParams();
  
    useEffect(() => {
      if (error) {
        Swal.fire({
          text: 'error occur' 
        })
        dispatch(clearErrors());
      }
     dispatch(getProduct(keyword)); 
        
    },[dispatch, keyword]);

 
 return (  
    <Fragment>
        { 
            loading ? (<Wait/>) :  
            ( 
                <Fragment>
                  
                   <h2 className="productsHeading"> Products </h2>

                   <div className="products"> 
                    {
                     products && products.map((product) => (
                      <Card  key={product._id} product={product}/>   
                       ))  
                    }  
                  </div> 
         
           </Fragment>
         )}
    </Fragment>
  );
};

export default Products;