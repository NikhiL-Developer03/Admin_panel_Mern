const mongoose  =  require("mongoose");
require("dotenv").config();

const dbConnect   = async()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(()=>{
        console.log("db connect sucessfully")
    })
    .catch((err)=>{
        console.log("dbconnect nhee huaa");
        console.log(err);
        process.exit(1);
        
    })
}

module.exports =dbConnect;