const express = require("express");
const mailRoute = express.Router();



const {sendMailByUserId} = require("../controllers/mail.js")
const {authentication} = require("../middlewares/authentication")

mailRoute.post("/mail" , authentication  , sendMailByUserId)

module.exports = mailRoute


