    const userModel = require("../../db/models/userModel")
    const nodemailer = require("nodemailer");

    const sendMailByUserId = async (req , res) => {
        const {text , targetUser} = req.body;
        const userId = req.token.userId
        try {
            const userInfo = await userModel.findOne({user : userId})
            mail = userInfo.mail
        } catch (error) {
            res.send("sendMailByUserId: " + error)
        }  
    }

    module.exports = {sendMailByUserId}