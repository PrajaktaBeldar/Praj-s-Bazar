const ErrorHandler = require("../class/errorHandler");
const catchAsyncError=require("../mid/catchAsyncError");
const User=require("../model/peopleModel");
const sendToken=require("../class/jwtToken");
const sendEmail=require("../class/sendEmail.js");
const cloudinary = require("cloudinary"); 
const crypto=require("crypto");
  
 
//register 
exports.registerPeople=catchAsyncError(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars" ,
        width:150 ,
        crop: "scale",
    });

    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email, 
        password,
        avatar:{
            public_id:myCloud.public_id, 
            url:myCloud.secure_url,
        }
    });


   sendToken(user,201,res);
});

//login
exports.loginPeople=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
     
    //checking if user givn email and password 
    if(!email || !password)
    {
    return next(new ErrorHandler("email and password is invalid",400));
    }
    const user=await User.findOne({email}).select("+password");

    if(!user) 
    {
        return next(new ErrorHandler("email and password is invalid",401));
    }

    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("email and password is invalid",401));
    }  
 
      

    sendToken(user,200,res);
});

//logout 
exports.logoutPeople=catchAsyncError(async(req,res,next)=>{
    res.cookie=("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({  
        success:true,
        message:"Logged out"
    });
})

//forgot password
exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    //get reset password token
    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}://${req.get(host)}/api/v1/password/reset/${resetToken}`;

    const message=`Your password reset token is :- \n\n ${resetPasswordUrl}\n\nif you not requetsed then, please ignore`;

    try{
        await sendEmail({
            email:user.email,
            subject:`ecommerce password recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:"Email sent to link",
        });
        
    }
    catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler("email not gone",500));
    }
});

//reset password

exports.resetPassword=catchAsyncError(async(req,res,next)=>{
    //creating token hash
    this.resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()},

    });

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("password does not mmatch",404));
    }

    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
    sendToken(user,200,res);
});

//get detailed
exports.getPeopleDetailed=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
    user,
    });

});


//update password
exports.updatePassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("password is not match",401));
    }  

    if(req.body.newPassword !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("password is not match",401));
    }
 
    user.password=req.body.newPassword;

    await user.save();

   sendToken(user,200,res); 
});


//update profile
exports.updateProfile=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    };

    const user= await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
    });

    res.status(200).json({
        success:true,
    });
});

    //Get all people(admin)
exports.getAllPeople=catchAsyncError(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users,
    });
});

  //Get single People(admin)
  exports.getSinglePeople=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found ${req.params.id}`,404));
    }    

    res.status(200).json({
        success:true,
        user,
    });
});

//update People role --admin

exports.updateRole=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };

    //we will add cloudinary later

    const user= await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
    });

    res.status(200).json({
        success:true,
    });
});

//delete user --admin
exports.deletePeople=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`user not found ${req.params.id}`,404));
    }

await user.remove();
    res.status(200).json({
        success:true,
    
    });

});