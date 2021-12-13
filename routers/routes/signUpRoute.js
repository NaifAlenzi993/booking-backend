const express = require("express");
const  signUpRoute = express.Router()

const  {signUp}  = require("../controllers/registry")

signUpRoute.post("/signUp",signUp)

module.exports = signUpRoute

