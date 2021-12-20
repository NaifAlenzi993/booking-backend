const mongoose = require ("mongoose")

const commentsModel = new mongoose.Schema({
    house: {type : String},
    text: { type : String },
    time: { type : String },
    rate: { type : Number },
    user: { type:mongoose.Schema.ObjectId, ref:"userModel" },
});

module.exports = mongoose.model("commentsModel", commentsModel)