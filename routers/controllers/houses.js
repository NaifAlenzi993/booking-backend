const housesModel = require("../../db/models/housesModel")

const addHouses =  async (req , res)=>{
        const {name , description , img , city , rooms , beds , baths , price, guests , views } = req.body;
        const user = req.token.userId
        const cours = new housesModel({name, description, img , user , city , rooms , beds , baths , price , guests ,  views : (views !== 0 ? views : 0)})
        try {
            const sav = await cours.save()
            const cour = await housesModel.find({}).populate("user")
            res.status(200).json(cour)
        } catch (error) {
            res.status(403).json(error)
        }

        
    }

const deleteHouse = async (req , res)=>{
        let id = req.params.id


        const userId = req.token.userId

     
            try {
                const deletej = await housesModel.findOneAndDelete({_id:id,user:userId})
                const cour = await housesModel.find({}).populate("user")
                res.status(200).json(cour)
            } catch (error) {
                res.status(403).json(error)
            }
    
        
    }


    const getHouse = async (req , res)=>{
        try {
            const cour = await housesModel.find({}).populate("user")
            res.status(200).json(cour)
        } catch (error) {
            
        }
       
    }

    const getHouseParams = async (req , res) => {
        const id = req.params.id
        try {
            const cour = await housesModel.find({_id:id}).populate("user")
            res.status(200).json(cour)
        } catch (error) {
            res.status(404).json(error)
        }
    }

    const updateHouse = async (req , res) => {
            const {idold , name , description , img} = req.body;
            try {
                let courUpdate = name && await housesModel.findByIdAndUpdate({_id: idold} , {name})
                 courUpdate = description && await housesModel.findByIdAndUpdate({_id: idold} , {description})
                 courUpdate = img && await housesModel.findByIdAndUpdate({_id: idold} , {img})
                const cours = await housesModel.find({})
                res.status(200).json(cours)
            } catch (error) {
                res.status(403).json(error)
            }
        
        }


    const deleteAll = async (req , res)=>{
           
             try {
                const deletej = await housesModel.remove()
                const cour = await housesModel.find({})
                res.status(200).json(cour)
            } catch (error) {
                res.status(403).json(error)
            }
            }




    module.exports = {addHouses , deleteHouse  , getHouse , updateHouse , getHouseParams , deleteAll}