import React from 'react';
import { Link } from "react-router-dom";
import { Rating } from "@mui/lab";


const Card = ({product}) => {

const options={  
   value: product.ratings, 
   readOnly: true, 
   precision : 0.5  
}
    return ( 
        <Link className="Card" to={`/product/${product._id}`}>
          <img src={product.image[0].url} alt={product.name} />
          <p>{product.name}</p>
          <div>     
            <Rating {...options}/>{" "}
            <span className="CardS">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>  
          </div> 
          <span>{`₹${product.price}`}</span>  
        </Link> 
      );
    
} 

export default Card;