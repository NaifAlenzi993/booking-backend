const housesModel = require("../../db/models/housesModel")
const requestsModel = require("../../db/models/requestsModel")

const requestAccept = async (req , res) => {
    const {id} = req.body;

    const request =  await requestsModel.findOne({_id : id})
    const newHouse = new housesModel(request)
    try {
        await newHouse.save()
        res.status(200).json("Request Accept Done !!")
    } catch (error) {
        res.status(403).json(error)
    }
}


const getAllRequests = async (req , res) => {
    try {
        const allRequest = await requestsModel.find({}).populate("user")
        res.status(201).json(allRequest)
    } catch (error) {
        res.status(404).json(error)
    }
}

const rejectRequest = async (req , res) => {
    const id = req.params.id;

    try {
        const rejectReq = await requestsModel.findOneAndDelete({_id:id})
        const allRequest = await requestsModel.find({}).populate("user")
        res.status(201).json(allRequest)
    } catch (error) {
        res.status(404).josn(error)
    }
}


module.exports = {requestAccept , getAllRequests , rejectRequest}