const express = require("express");
const loginRoute  = express.Router()

const  {login}  = require("../controllers/registry")

loginRoute.post("/login" , login )

module.exports = loginRoute