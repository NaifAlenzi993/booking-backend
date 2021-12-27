const housesModel = require("../../db/models/housesModel")
const favModel = require("../../db/models/favModel")
const userModel = require("../../db/models/userModel")


const addFav = async (req , res) => {
    const {house} = req.body
    
    const user = req.token.userId
    try {
        const isFoundFav = await favModel.find({house : house , user : user})
        if (isFoundFav.length) {
            const del = await favModel.findOneAndDelete({house , user})
            const favAll = await favModel.find({user: user}).populate("house").populate("user")
            res.status(200).json(favAll)
        }else{
            const newFav = new favModel({house , user})
            await newFav.save()
            const favAll = await favModel.find({user: user}).populate("house").populate("user")
            res.status(200).json(favAll)
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

const getFav = async (req , res) => {
    const user = req.token.userId
    // console.log("dfkhdkj" , "line 29 fav");
    try {
        const favAll = await favModel.find({user:user}).populate("user").populate("house")
        res.status(200).json(favAll)
    } catch (error) {
        res.status(404).json(error)
    }
}


module.exports = {addFav , getFav}