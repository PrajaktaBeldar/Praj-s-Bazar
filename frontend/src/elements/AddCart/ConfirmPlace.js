import React, { Fragment } from "react";
import CheckoutSteps from "./Status.js";
import { useSelector } from "react-redux";
import Label from "../layout/Label"; 
import "./ConfirmPlace.css";  
import { Link } from "react-router-dom";  
import { useNavigate } from "react-router-dom";

const ConfirmPlace = () => { 
    const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  
  const { shippingInfo } = useSelector((state) => state.shipping);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );   

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.data.address}, ${shippingInfo.data.city}, ${shippingInfo.data.state}, ${shippingInfo.data.pinCode}, ${shippingInfo.data.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <Label title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <p>Shipping Info</p>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.data.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div> 
          
          <div className="confirmCartItems">
           <p>Your Cart Items:</p>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => ( 
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div> 
          <div className="orderSummary">
            <p>Order Summery</p>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div> 
    </Fragment>
  );
};

export default ConfirmPlace;
