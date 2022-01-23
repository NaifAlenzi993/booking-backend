const housesModel = require("../../db/models/housesModel")
const requestModel = require("../../db/models/requestsModel")
const userModel = require("../../db/models/userModel")
const favModel = require("../../db/models/favModel")

const addRequestToHouse = async (req , res) => {
    const {name , description , img , city , rooms , beds , baths , price, guests , views } = req.body;


}


const addHouses =  async (req , res)=>{
    // console.log("jgkhgk");
    const {name , description , img , city , rooms , beds , baths , price, guests } = req.body;
    const user = req.token.userId;
    const role = req.token.role;
    if (role == 0) {
        const newHouse = new housesModel({name, description , img , user , city , rooms , beds , baths , price , guests , views : 0 , rating:5})
        try {
            await newHouse.save()
            const house = await housesModel.find({}).populate("user")
            res.status(200).json("Added House Done !!")
        } catch (error) {
            res.status(403).json(error)
        }
    }else{
        const newRequest = new requestModel({name, description , img , user , city , rooms , beds , baths , price , guests , views : 0,rating:5})
        try {
            await newRequest.save()
            // const house = await housesModel.find({}).populate("user")
            res.status(201).json("Added Request Done !!")
        } catch (error) {
            res.status(403).json(error)
        }

    }
    
    }

const deleteHouseById = async (req , res)=>{
        let id = req.params.id
        const userId = req.token.userId
        const role = req.token.role
            try {
                if (role == 0) {
                    const deletej = await housesModel.findOneAndDelete({_id:id})
                    const house = await housesModel.find({}).populate("user")
                    res.status(200).json(house)
                }else{
                    const deletej = await housesModel.findOneAndDelete({_id:id,user:userId})
                    const house = await housesModel.find({}).populate("user")
                    res.status(200).json(house)
                }
            } catch (error) {
                res.status(403).json(error)
            }
    }


    const getHouse = async (req , res)=>{
        try {
            const houseAll = await housesModel.find({}).populate("user")
            res.status(200).json(houseAll)
        } catch (error) {
            res.status(404).json(error)
        }
       
    }

    const getHouseById = async (req , res) => {
        const id = req.params.id
        try {
            console.log(id);
            const house = await housesModel.find({_id:id}).populate("user")
            await housesModel.findOneAndUpdate({_id:id} , {views: house[0].views + 1})
            const houseu = await housesModel.find({_id:id}).populate("user")
            console.log(house);
            
            res.status(200).json(houseu)
        } catch (error) {
            res.status(404).json(error)
        }
    }

    const updateHouseById = async (req , res) => {
            const {idold , name , description , img , price} = req.body;
            console.log(price);
            try {
                name && await housesModel.findByIdAndUpdate({_id: idold} , {name})
                description && await housesModel.findByIdAndUpdate({_id: idold} , {description})
                img && await housesModel.findByIdAndUpdate({_id: idold} , {img})
                price && await housesModel.findByIdAndUpdate({_id: idold} , {price})
                const houses = await housesModel.find({})
                res.status(200).json(houses)
            } catch (error) {
                res.status(403).json(error)
            }
        
        }


    const getAllHouseByUserId = async (req , res) => {
        const id = req.params.id
        const userId = req.token.userId
        try {
            const allHouse = await housesModel.find({user:id})
            res.status(200).json(allHouse)
        } catch (error) {
            res.send("getallHouseByUserId : " + error)
        }
    }

    const getAllFavByUserId = async (req , res) => {
        const id = req.params.id
        const userId = req.token.userId
        try {
            const allFav = await favModel.find({user:id})
            res.status(200).json(allFav)
        } catch (error) {
            res.send("getAllFavByUserId : " + error)
        }
    }


    const deleteAll = async (req , res)=>{
            try {
                const deletej = await housesModel.remove()
                const house = await housesModel.find({})
                res.status(200).json(house)
            } catch (error) {
                res.status(403).json(error)
            }
            }

    const getInfoUser = async (req , res) => {
        const id = req.params.id
        try {
            const userInfo = await userModel.findOne({_id: id} , {password : 0})
            res.status(200).json(userInfo)
        } catch (error) {
            res.send("error line 108 houses.js")
        }
    }


    module.exports = {addHouses , deleteHouseById  , getHouse , updateHouseById , getHouseById , deleteAll , getInfoUser , getAllHouseByUserId , getAllFavByUserId}