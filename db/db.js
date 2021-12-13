const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bookingDB").then(
    ()=>{
        console.log("mongodb Connected");
    }
).catch(
    (err)=>{
        console.log(err);
    }
)


