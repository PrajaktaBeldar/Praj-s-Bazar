const express=require("express");
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload"); 

const path = require("path");

const app=express();

app.use(express.json()); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(fileUpload());

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}  

// Route Imports
const product=require("./allRoutes/productRoute");
const error=require("./mid/error");
const user=require("./allRoutes/peopleRoute");
const order=require("./allRoutes/orderRoute");
  
 
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
 
app.use(error);  
module.exports=app;     