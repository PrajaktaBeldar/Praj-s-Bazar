const express = require("express");
const router = express.Router();
const {newOrder,getSingleOrder,myOrders,getAllOrders
    ,updateOrder,deleteOrder  
}=require("../allControllers/orderController");

const { isAuthenticatedPeople, authorizeRoles } = require("../mid/authentication");

router.route("/order/new").post(isAuthenticatedPeople, newOrder);
router.route("/order/:id").get(isAuthenticatedPeople, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedPeople, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedPeople, authorizeRoles("admin"), getAllOrders); 

router
  .route("/admin/order/:id") 
  .put(isAuthenticatedPeople, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedPeople, authorizeRoles("admin"), deleteOrder);

module.exports = router;    