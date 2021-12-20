const mongoose = require ("mongoose")

const favModel = new mongoose.Schema({
    house: {type:mongoose.Schema.ObjectId, ref:"housesModel"},
    user: {type:mongoose.Schema.ObjectId, ref:"userModel"},
});

module.exports = mongoose.model("favModel", favModel)