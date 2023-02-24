import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, productReducer ,productsReducer, productDetailsReducer , newReviewReducer,productReviewsReducer, reviewReducer }
 from "./allReducers/productReducer";
import { userReducer, allUsersReducer , profileReducer , userDetailsReducer , forgotPasswordReducer} from "./allReducers/peopleReducer";

import { cartReducer , shippingReducer } from "./allReducers/cartReducer";

import {
  allOrdersReducer,
  myOrdersReducer,   
  newOrderReducer,    
  orderDetailsReducer,  
  orderReducer,
} from "./allReducers/orderReducer";

const middleware = [thunk];  
const reducer=combineReducers({ 
    products :  productsReducer,  
    productDetails  :productDetailsReducer, 
    user: userReducer,
    profile: profileReducer,   
    forgotPassword: forgotPasswordReducer, 
    cart: cartReducer,
    shipping:shippingReducer, 
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    allOrders: allOrdersReducer,
    allUsers: allUsersReducer,
    newProduct: newProductReducer,
    product: productReducer,
    order: orderReducer,
    userDetails:userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
}); 
let initialState={
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  }
};   
 
const store = createStore(
  reducer,
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);
  
export default store;