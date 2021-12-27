const mongoose = require ("mongoose")

const requestsModel = new mongoose.Schema({
    name: { type : String },
    description: { type : String },
    img: {type : String},
    city: {type:String},
    rooms: {type:Number},
    beds: {type:Number},
    baths: {type:Number},
    guests: {type:Number},
    typeHouse: {type: String},
    price: {type: Number},
    rating: {type: Number},
    views: {type: Number},
    user: {type:mongoose.Schema.ObjectId, ref:"userModel"},
});

module.exports = mongoose.model("requestsModel", requestsModel)