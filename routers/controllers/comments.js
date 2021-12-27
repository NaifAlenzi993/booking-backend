const housesModel = require("../../db/models/housesModel")
const commentsModel = require("../../db/models/commentsModel")

const addComment = async (req ,res) => {
    const {house , text , rate , user} = req.body
    const time = getDateNow()

    // console.log(house);
    const newComment = new commentsModel({house , text , rate , user , time})
    try {
        await newComment.save()
        const allComments = await commentsModel.find({house : house}).populate("house").populate("user")

        res.status(200).json(allComments)
        
    } catch (error) {
        res.status(404).json(error)
    }
}

const getComments = async ( req , res) => {
    const {house} = req.body
    try {
        const comments = await commentsModel.find({house})
        res.status(200).json(comments)
    } catch (error) {
        res.status(404).json(error)
    }
}

function getDateNow(){
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return date;
  }

module.exports = {addComment , getComments}

