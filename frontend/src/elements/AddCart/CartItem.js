import React, { Fragment} from "react";
import "./CartItem.css";
import CartCard from "./CartCard.js";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../allActions/cartAction";
import  Typography  from "@mui/material/Typography";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Swal  from "sweetalert2";  
   
const CartItem = () => {   
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  }; 

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return; 
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id)); 
  };  

  const checkoutHandler = () => { 
    navigate("/login?redirect=shipping"); 
  };
 
  useEffect( () => {

    if(isAuthenticated===false){ 
      Swal.fire({
        text: 'Please login or register to view this cart.'
      })
      navigate("/login");
    }
 
  }, [dispatch] );   

  return (
    <Fragment>
      {cartItems.length === 0 ? ( 
        <div className="emptyCartItem">
          <RemoveShoppingCart />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
         isAuthenticated && 
        <Fragment>
          <div className="cartList">
            <div className="cartHeader"> 
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartTotal">
              <div></div>
              <div className="cartTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div> 
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  
  );
};

export default CartItem;
