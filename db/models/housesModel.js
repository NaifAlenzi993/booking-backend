const mongoose = require ("mongoose")

const housesModel = new mongoose.Schema({
    name: { type : String },
    description: { type : String },
    img: {type : String},
    user: {type:mongoose.Schema.ObjectId, ref:"userModel"}
});

module.exports = mongoose.model("housesModel", housesModel)