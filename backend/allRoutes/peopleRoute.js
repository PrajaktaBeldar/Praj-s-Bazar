const express=require("express");
const { 
    registerPeople, 
    loginPeople, 
    logoutPeople, 
    forgotPassword,  
    resetPassword,  
    getPeopleDetailed,
    updatePassword, 
    updateProfile,
    getAllPeople,
    getSinglePeople,  
    updateRole,
    deletePeople
        } = require("../allControllers/peopleController");

 const {authorizeRoles, isAuthenticatedPeople} = require("../mid/authentication");        

const router=express.Router(); 
router.route("/register").post(registerPeople);  
router.route("/login").post(loginPeople); 
router.route("/password/forgot").post(forgotPassword);  
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedPeople,updatePassword);
router.route("/me/update").put(isAuthenticatedPeople,updateProfile);
router.route("/me").get(isAuthenticatedPeople,getPeopleDetailed);  
router.route("/logout").get(logoutPeople); 


router.route("/admin/users").get(isAuthenticatedPeople,authorizeRoles("admin"),getAllPeople); 

router.route("/admin/users/:id").
get(isAuthenticatedPeople,authorizeRoles("admin"),getSinglePeople)
.put(isAuthenticatedPeople,authorizeRoles("admin"),updateRole)
.delete(isAuthenticatedPeople,authorizeRoles("admin"),deletePeople);
module.exports=router;    