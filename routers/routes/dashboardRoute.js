const express = require("express");
const dashboardRoute = express.Router();


const {requestAccept , getAllRequests , rejectRequest , sendMail 
    , getAllUser , getBlockUsers , blockUser , unBlockUser ,isUserBLock} = require("../controllers/dashboard");
const {authentication} = require("../middlewares/authentication")
const {authorization} = require("../middlewares/authorization")



dashboardRoute.post("/request" , authentication , authorization, requestAccept)
dashboardRoute.get("/request" , authentication , authorization , getAllRequests)
dashboardRoute.delete("/request/:id" , authentication , authorization , rejectRequest)

//block user
dashboardRoute.get("/get-users" , authentication , authorization , getAllUser)
dashboardRoute.post("/block" , authentication , authorization , blockUser)
dashboardRoute.delete("/block" , authentication , authorization , unBlockUser)

dashboardRoute.get("/block" , authentication  , getBlockUsers)
dashboardRoute.get("/check-user" , authentication  , isUserBLock)



dashboardRoute.post("/sendmail" , authentication , sendMail)


module.exports = dashboardRoute
