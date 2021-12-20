const housesModel = require("../../db/models/housesModel")
// const favModel = require("../../db/models/favModel")

const addHouses =  async (req , res)=>{
        const {name , description , img , city , rooms , beds , baths , price, guests , views } = req.body;
        const user = req.token.userId
        const houses = new housesModel({name, description, img , user , city , rooms , beds , baths , price , guests ,  views : (views !== 0 ? views : 0)})
        try {
            const sav = await houses.save()
            const house = await housesModel.find({}).populate("user")
            res.status(200).json(house)
        } catch (error) {
            res.status(403).json(error)
        }

        
    }

const deleteHouse = async (req , res)=>{
        let id = req.params.id
        const userId = req.token.userId

            try {
                const deletej = await housesModel.findOneAndDelete({_id:id,user:userId})
                const house = await housesModel.find({}).populate("user")
                res.status(200).json(house)
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
            const house = await housesModel.find({_id:id}).populate("user")
            res.status(200).json(house)
        } catch (error) {
            res.status(404).json(error)
        }
    }

    const updateHouse = async (req , res) => {
            const {idold , name , description , img} = req.body;
            try {
                let houseUpdate = name && await housesModel.findByIdAndUpdate({_id: idold} , {name})
                 houseUpdate = description && await housesModel.findByIdAndUpdate({_id: idold} , {description})
                 houseUpdate = img && await housesModel.findByIdAndUpdate({_id: idold} , {img})
                const houses = await housesModel.find({})
                res.status(200).json(houses)
            } catch (error) {
                res.status(403).json(error)
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


    module.exports = {addHouses , deleteHouse  , getHouse , updateHouse , getHouseById , deleteAll}