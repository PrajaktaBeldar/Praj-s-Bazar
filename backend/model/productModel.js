const moongoose=require("mongoose");

const productSchema=new moongoose.Schema({
    name:{ 
        type:String, 
        required:[true,"Please enter your name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Plese enter description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[8,"price can not exceed 8 character"]
    },
    ratings:{
        type:Number,
        default:0 
    }, 
 
    image:[
        { 
            public_id:{  
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    
    category:{
        type:String,
        required:[true,"Please enter product category"]
        },
      
      stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        macLength:[4,"Stock cannot exceed 4 character"],
        default:1
      },
      
      numOfReviews:{
        type:Number,
        default:0
      },
      reviews:[
        {
            user: {
                type: moongoose.Schema.ObjectId,
                ref: "user",
                required:true,
                
              },
            name:{
                type:String,
                required:true
                },
                rating:{
                    type:Number,
                    required:true
                },
                comment:{
                    type:String,
                    required:true
                }
        }
      ],
      user: {
        type: moongoose.Schema.ObjectId,
        ref: "user",
        required:true,
        
      },

      createdAt:{
        type:Date,
        default:Date.now
      }
   
})

module.exports=moongoose.model("Product",productSchema); 