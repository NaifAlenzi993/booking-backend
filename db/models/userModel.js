const mongoose = require ("mongoose")

const userModel = new mongoose.Schema({
    name: { type : String },
    email: { type : String  , unique : true },
    password: { type : String },
    type: {type: Number},
    dateCreateAcc : {type: Date} , 
    lastActiveAt: {type: Date}
});

module.exports = mongoose.model("userModel", userModel)