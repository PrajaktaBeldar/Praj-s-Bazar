import React from 'react';
import "./last.css";
import { Link } from "react-router-dom";
import Home from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartCheckout from "@mui/icons-material/ShoppingCartCheckout";
import Category from "@mui/icons-material/Category";

const Last = () => {   
  return (  
     
    <div className="last"> 
        <div>
            <Link to="/"><Home/></Link>
        </div> 
        
        <div>
        <Link to="/products"><Category/></Link>
        </div>

        <div>
        <Link to="/account"><AccountCircle/></Link>
         </div>

        <div>
            <Link to="/cart"><ShoppingCartCheckout/></Link>
        </div>
 
    </div>
   
  )
}

export default Last;