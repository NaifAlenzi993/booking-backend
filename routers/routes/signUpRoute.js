const express = require("express");
const  signUpRoute = express.Router()

const  {signUp , signupWithActiveCode , checkAvtiveCode , sendNewCodeActive}  = require("../controllers/registry")

signUpRoute.post("/signUp",signUp)
signUpRoute.post("/signup-active" , signupWithActiveCode)
signUpRoute.post("/check-code" , checkAvtiveCode)
signUpRoute.post("/gen-new-code" , sendNewCodeActive)


module.exports = signUpRoute

