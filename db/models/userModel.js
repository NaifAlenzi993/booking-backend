const mongoose = require ("mongoose")

const userModel = new mongoose.Schema({
    name: { type : String },
    email: { type : String  , unique : true },
    password: { type : String },
    role: {type: Number},
    img: {type: String},
    dateCreateAcc : {type: String} , 
    lastActiveAt: {type: String},
});

module.exports = mongoose.model("userModel", userModel)