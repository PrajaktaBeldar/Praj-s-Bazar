const express=require("express");
const {getAllProduct, createProduct, getProductDetailed, createProductReview,getProductReviews,deleteReview}=require("../allControllers/productController");
const { isAuthenticatedPeople, authorizeRoles} = require("../mid/authentication");
const router=express.Router();   
  
router.route("/admin/product/new").post(isAuthenticatedPeople,authorizeRoles("admin"),createProduct);
router.route("/products").get(getAllProduct);    
 
router.route("/product/:id").get(getProductDetailed);   
 
router.route("/review").put(isAuthenticatedPeople, createProductReview);
  
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedPeople, deleteReview);
 
module.exports=router;      