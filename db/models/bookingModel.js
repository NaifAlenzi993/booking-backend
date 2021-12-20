const mongoose = require ("mongoose")

const bookingModel = new mongoose.Schema({
    startDate: { type : String },
    expiryDate: { type : String},
    priceTotal: {type: Number},
    user: {type:mongoose.Schema.ObjectId, ref:"userModel"},
    house: {type:mongoose.Schema.ObjectId, ref:"housesModel"},
    isBooked: {type:Boolean}
});

module.exports = mongoose.model("bookingModel", bookingModel)