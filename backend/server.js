const app=require("./app");
const cloudinary = require("cloudinary");
const connectionDatabase=require("./config/database");


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  } 
  

//uncaught erroe handling 
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaught rejection`); 
    process.exit(1);
}); 

connectionDatabase();
 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server=( app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
}));

//unHandler rejection error 
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled rejection`);
    server.close(()=>{
        process.exit(1);
    })
});