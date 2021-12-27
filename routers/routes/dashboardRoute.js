const express = require("express");
const { model, models } = require("mongoose");
const dashboardModel = express.Router();


const {requestAccept , getAllRequests , rejectRequest} = require("../controllers/dashboard");
const {authentication} = require("../middlewares/authentication")
const {authorization} = require("../middlewares/authorization")


dashboardModel.post("/request" , authentication , authorization, requestAccept)
dashboardModel.get("/request" , authentication , authorization , getAllRequests)
dashboardModel.delete("/request/:id" , authentication , authorization , rejectRequest)



module.exports = dashboardModel