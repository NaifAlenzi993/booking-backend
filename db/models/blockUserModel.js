const mongoose = require ("mongoose")

const blockUserModel = new mongoose.Schema({
    user: {type:mongoose.Schema.ObjectId, ref:"blockUserModel"} 
});

module.exports = mongoose.model("blockUserModel", blockUserModel)