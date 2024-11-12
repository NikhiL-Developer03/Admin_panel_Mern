const mongoose   = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
       
        trim:true
    },
  
    mobileNo:{
     type:Number
    },
    designation:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        required:true
    },
    course:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true 
    }
   ,
    password:{
        type:String,
        required:true
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now(),
      
    },
    updatedAt:{
        type:Date,
    },
    role:{
        type:String,
        enum:["Admin","User"],
        required:true
    },
   
})

module.exports = mongoose.model("User",userSchema);