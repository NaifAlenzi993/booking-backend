const housesModel = require("../../db/models/housesModel")
const requestsModel = require("../../db/models/requestsModel")

const nodemailer = require("nodemailer");

const requestAccept = async (req , res) => {
    const {id} = req.body;

    const request =  await requestsModel.findOneAndDelete({_id : id})
    const {name,
        price,
        city,
        rooms,
        guests,
        img,
        beds,
        baths,
        description,
        typeHouse ,
        user} = request


    const newHouse = new housesModel({name,
        price,
        city,
        rooms,
        guests,
        img,
        beds,
        baths,
        description,
        typeHouse,
        user})

    try {
        await newHouse.save()
        const allReqouest = await requestsModel.find({}).populate("user")
        res.status(200).json(allReqouest)
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


const sendMail = async (req , res) => {
    const {codeActive , email} = req.body
    
    const transport =  nodemailer.createTransport({
        service : "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
            }
        });

        transport.sendMail({
            from : process.env.EMAIL,
            to : email , 
            subject : "Booking App - Active User",
            html : `
            <div> 
            <h1>Active Code : ${codeActive}</h1> 
            </div>
            `
        } , (err , data) => {
            if (err) {
                res.status(404).json(err)
            }else{
                res.status(201).json("sent data done !")
            }
        })

}


module.exports = {requestAccept , getAllRequests , rejectRequest , sendMail}