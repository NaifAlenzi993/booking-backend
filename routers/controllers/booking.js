const housesModel = require("../../db/models/housesModel")
const bookingModel = require("../../db/models/bookingModel")



const addBooking = async (req  , res) => {
    const {startDate , expiryDate , user , house ,priceTotal } = req.body

    const newBooking = new bookingModel({startDate , expiryDate , user , house , priceTotal})
    try {
        const booking = await newBooking.save()
        const allBooking = await bookingModel.find({})
        res.status(201).json(booking)
    } catch(error) {
        res.status(404).json(error)
    }

}

const getBooking = async (req , res) => {
    try {
        const booking = await bookingModel.find({user : req.token.userId}).populate("user").populate("house")
        res.status(200).json(booking)
    } catch (error) {
        res.status(404).json(error)
    }

}

const delteBooking = async (req , res) => {
    const id = req.params.id
    const userId = req.token.userId
    try {
        const cancelBooking = await bookingModel.findOneAndDelete({_id : id , user : userId })
        const allBooking = await bookingModel.find({}).populate("user").populate("house")
        res.status(200).json(allBooking)
    } catch (error) {
        res.status(403).json(error)
    }
}


module.exports = {addBooking , getBooking , delteBooking}