const express = require("express");
const userRoute = express.Router();


const {authentication} = require("../middlewares/authentication")
const { getUserInfo, updateUserName } = require("../controllers/registry")

userRoute.get("/user", authentication, getUserInfo);
userRoute.put("/user", authentication, updateUserName);


module.exports = userRoute;
