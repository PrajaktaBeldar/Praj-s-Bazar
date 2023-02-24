const ErrorHandler=require("../class/errorHandler");

module.exports=(err,req,res,next)=>{
   
    err.status=err.status || 500; 
    err.message=err.message || "Internal error found";

    if(err.name==="CastError")
    {
        const message=`Invalid cast error.${err.path}`;
        err=new ErrorHandler(message,400);
    }

    if(err.code===11000)
    {
        const message=`Dupliacate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }

    if(err.name==="JsonWebTokenError")
    {
        const message=`Json web token error is invalid`;
        err=new ErrorHandler(message,400);
    }

    if(err.name==="TokenExpiredError")
    {
        const message=`Json web token is expired`;
        err=new ErrorHandler(message,400);
    }

    res.status(err.status).json({
        success:false,
        message:err.message,
    }); 
}    