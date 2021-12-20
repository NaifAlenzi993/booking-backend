const mongoose = require ("mongoose")

const userModel = new mongoose.Schema({
    name: { type : String },
    email: { type : String  , unique : true },
    password: { type : String },
    role: {type: Number},
    fav : [{type: mongoose.Schema.Types.ObjectId, ref: "housesModel"}],
    dateCreateAcc : {type: Date} , 
    lastActiveAt: {type: Date}
});

module.exports = mongoose.model("userModel", userModel)