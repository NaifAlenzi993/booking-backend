const express = require("express");
const favRoute = express.Router();

const {addFav , getFav} = require("../controllers/fav");
const {authentication} = require("../middlewares/authentication")

favRoute.post("/fav" , authentication , addFav)
favRoute.get("/fav" , authentication , getFav)


module.exports = favRoute;