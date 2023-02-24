import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./Status";
import { useSelector, useDispatch } from "react-redux";
import Label from "../layout/Label";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe, 
  useElements,
} from "@stripe/react-stripe-js";
import Swal  from "sweetalert2"; 
import axios from "axios";
import "./PaymentDetail.css";
import CreditCard from "@mui/icons-material/CreditCard";
import Event from "@mui/icons-material/Event";
import VpnKey from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../allActions/orderAction";

const PaymentDetail = ( ) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();
  const dispatch = useDispatch(); 
 
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { cartItems } = useSelector((state) => state.cart);
  const { shippingInfo }=useSelector((state) => state.shipping);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        Swal.fire({
          text: 'error occur'
        })
     
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          
          dispatch(createOrder(order));

          navigate("/success");
        } else {
          Swal.fire({
            text: 'There is some issue while processing payment '
          }) 
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      Swal.fire({
        text: 'error occur'
      }) 
    }
  };

  useEffect( () => {
    if(error){
      dispatch(clearErrors());
    }
  }, [dispatch,  error] );  

  return ( 
    <Fragment>
      <Label title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <p>Card Info</p>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
  
    </Fragment>
  );
};

export default PaymentDetail;
