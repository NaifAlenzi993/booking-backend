const express = require("express");
const dashboardRoute = express.Router();


const {requestAccept , getAllRequests , rejectRequest , sendMail} = require("../controllers/dashboard");
const {authentication} = require("../middlewares/authentication")
const {authorization} = require("../middlewares/authorization")



dashboardRoute.post("/request" , authentication , authorization, requestAccept)
dashboardRoute.get("/request" , authentication , authorization , getAllRequests)
dashboardRoute.delete("/request/:id" , authentication , authorization , rejectRequest)

dashboardRoute.post("/sendmail" , authentication , sendMail)



module.exports = dashboardRoute
