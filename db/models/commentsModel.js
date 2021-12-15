const mongoose = require ("mongoose")

const commentsModel = new mongoose.Schema({
    text: { type : String },
    time: { type : Date},
    user: {type:mongoose.Schema.ObjectId, ref:"userModel"},
});

module.exports = mongoose.model("commentsModel", commentsModel)