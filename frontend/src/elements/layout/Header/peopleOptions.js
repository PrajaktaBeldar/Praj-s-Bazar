import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial , SpeedDialAction } from "@mui/lab";
import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import ListAlt from "@mui/icons-material/ListAlt"; 
import { useNavigate } from 'react-router-dom';
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import ExitToApp from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";

 

import { logout } from "../../../allActions/peopleAction";


const peopleOptions = ({ user }) => {
  
  const { cartItems } = useSelector((state) => state.cart); 
  const [open, setOpen] = useState(false);
  const navigate= useNavigate();

  const dispatch = useDispatch();

  const options = [ 
    { icon: <ListAlt />, func: orders },
    { icon: <Person />, func: account }, 
    
    {
      icon: (
        <ShoppingCart
          style={{ color: cartItems.length > 0 ? "blue" : "unset" }}
        />
      ),
      func: cart,
    },
    { icon: <ExitToApp />, func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      func: dashboard,
    });
  }

  function dashboard() { 
    navigate(`/admin/dashboard`);
  }

  function orders() {
    navigate(`/orders`);
  } 
  function account() {
    navigate(`/account`);
  }
 
  function cart() {
    navigate(`/cart`);
  }

  function logoutUser() {
    dispatch(logout());
   
  } 

  return (
    <Fragment>
     
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)} 
        style={{ zIndex: "11" }}
        open={open}
        direction="down" 
        className="speedDial" 
        icon={  
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  ); 
}; 

export default peopleOptions;
