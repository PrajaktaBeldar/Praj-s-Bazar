const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"],
        maxLength:[30,"name can not exceed 30 character"],
        minLength:[4,"name should have more than 4 character"]
    },
    email:{
        type:String,
        required:[true,"Please enter name"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minLength:[8,"password should be greater than 8 character"],
        select:false
    },

    avatar:
        {
                public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            },
        },

        role:{
            type:String,
            default:"user", 
        },

        createdAt:{
            type: Date,
            default :Date.now,
        },

        resetPasswordToken:String,
        resetPasswordExpire:Date
    
});
userSchema.pre("save",async function(){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

//JWT Tokens 
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRETKEY,
        {
            expiresIn:process.env.JWT_EXPIRES
        });
};

//for comparing password 
userSchema.methods.comparePassword=async function(userPassword){
    return bcrypt.compare(userPassword,this.password);
}


//for reset password
userSchema.methods.getResetPasswordToken=function(){
    //Generating token
    const resetToken=crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetPassword to userSchema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire=Date.now() +15 *60*1000;

    return resetToken;
}

module.exports=mongoose.model("User",userSchema);