import React from 'react';
import { useEffect , useState } from "react"; 
import './App.css'; 
import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Options from "./elements/layout/Header/peopleOptions";
import Header from "./elements/layout/Header/Header.js";
import WebFont from "webfontloader";
import Home from "./elements/Home/Home.js";
import SingleProduct from "./elements/Products/SingleProduct.js";  
import Products from "./elements/Products/Products.js";
import Search from "./elements/Products/Search.js";
import LoginRegister  from "./elements/People/LoginRegister.js";
import store from "./store"; 
import axios from "axios"; 
import { loadUser } from './allActions/peopleAction';
import { useSelector } from 'react-redux';   
import Profile from "./elements/People/Profile";  
import ProtectedRoute from "./elements/Route/ProtectedRoute";
import UpdateProfile from "./elements/People/UpdateProfile.js";
import UpdatePassword from "./elements/People/UpdatePassword.js";
import ForgotPassword from "./elements/People/ForgotPassword.js";
import ResetPassword from "./elements/People/ResetPassword.js";
import CartItem from "./elements/AddCart/CartItem.js";   
import ShippingDetail from "./elements/AddCart/ShippingDetail.js";
import ConfirmPlace from "./elements/AddCart/ConfirmPlace.js";  
import PaymentDetail from "./elements/AddCart/PaymentDetail.js"; 
import { Elements } from "@stripe/react-stripe-js";  
import { loadStripe } from "@stripe/stripe-js";  
import OrderPlace from "./elements/AddCart/OrderPlace.js"; 
import Orders from "./elements/Orders/Orders.js"; 
import OrderInfo from "./elements/Orders/OrderInfo.js";
import Dashboard from "./elements/Admin/Dashboard.js";
import NotFound from "./elements/layout/Not Found/NotFound.js";
import Last from "./elements/layout/Bottom/Last.js"; 

function App() {    
   const {  isAuthenticated, user} =useSelector( state => state.user); 
   const [stripeApiKey, setStripeApiKey] = useState("");
 
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{  
    WebFont.load({  
      google:{
        families:["Roboto","Droid Sans", "Chilanka"], 
      }, 
    });
    store.dispatch(loadUser());

    getStripeApiKey(); 
  },[]); 
  
  window.addEventListener("contextmenu", (e) => e.preventDefault()); 
  
  return (    
   <Router>  
    <Header/>   
    { isAuthenticated && <Options user={user}/>}

    <Elements stripe={ loadStripe(stripeApiKey) }>
      <Routes> 
     <Route path="/" element={<Home/>} /> 
     <Route path="/product/:id" element={<SingleProduct/>} /> 
       <Route path="/products" element={<Products/>} /> 
        
       <Route path="/products/:keyword" element={<Products/>} /> 
       <Route path="/search" element={<Search/>} />  
       <Route path="/login" element={<LoginRegister />} /> 
       <Route path="/cart" element={<CartItem/>} />

       <Route path="/password/forgot" element={<ForgotPassword/>} />
        <Route path="/password/reset/:token" element={<ResetPassword/>} />

       <Route path="/me/update" element={
        <ProtectedRoute>
             <UpdateProfile/>
        </ProtectedRoute> 
      } />
 
      <Route  path="/account" element={
       <ProtectedRoute>
      <Profile/>
      </ProtectedRoute>}   
         /> 
 
      <Route
      path="/password/update" 
      element ={
        <ProtectedRoute>
        <UpdatePassword/> 
        </ProtectedRoute>
      }
    />

<Route
      path="/shipping" 
      element ={
        <ProtectedRoute>
        <ShippingDetail/>
        </ProtectedRoute>
      }
    />  

<Route
      path="/order/confirm"  
      element ={
        <ProtectedRoute>
        <ConfirmPlace/>
        </ProtectedRoute>
      } 
    /> 



<Route
      path="/success" 
      element ={
        <ProtectedRoute>
        <OrderPlace/>
        </ProtectedRoute>
      }
    />  

 <Route
  path="/orders"  
  element ={
    <ProtectedRoute>
       <Orders/>
    </ProtectedRoute>
  }
  />


<Route
  path="/process/payment"  
  element ={
    <ProtectedRoute> 
       <PaymentDetail/> 
    </ProtectedRoute>
  } 
  />
 

<Route
  path="/order/:id"  
  element ={
    <ProtectedRoute>
       <OrderInfo/>
    </ProtectedRoute>
  }
  />

<Route
      path="/admin/dashboard" 
      element ={
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
      }
    /> 


<Route
path='*'
  element ={
   <NotFound/> 
  }
/> 


 </Routes>
 </Elements>  

    
    <Last/> 
   </Router>
     );
}
 
export default App;
 