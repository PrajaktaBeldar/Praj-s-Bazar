import React, { Fragment, useEffect } from "react";
import "./OrderInfo.css";
import { useSelector, useDispatch } from "react-redux";
import Label from "../layout/Label";
import { Link } from "react-router-dom"; 
import { useParams } from "react-router-dom"; 
import { Typography } from "@mui/material";
import { getOrderDetails, clearErrors } from "../../allActions/orderAction";
import Swal  from "sweetalert2";
import Wait from "../layout/Waiting/Wait";
   
const OrderInfo = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
    const {id}= useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    if (error) { 
      Swal.fire({
        text: 'error occur'
      })
  dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch,  error, id]);
  return (
    <Fragment>
      {loading ? (
        <Wait /> 
      ) : (
        <Fragment>
          <Label title="Order Details" />
          <div className="orderInformation">
            <div className="orderContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                     {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div> 

            <div className="orderCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderInfo;
