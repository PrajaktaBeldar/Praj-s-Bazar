import React from "react";
import "./CartCard.css"; 
import { Link } from "react-router-dom";

const CartCard = ({ item, deleteCartItems }) => {
  return ( 
    <div className="CartCard"> 
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartCard;
