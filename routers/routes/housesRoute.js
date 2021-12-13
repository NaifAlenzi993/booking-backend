
const express = require("express");
const houseModel = express.Router();


// module.exports = {addHouses , deleteHouse  , getHouse , updateHouse , deleteAll}
// const { authentication } = require("../middleware/authentication");
const {addHouses , deleteHouse  , getHouse , updateHouse , deleteAll} = require("../controllers/houses");

const {authentication} = require("../middlewares/authentication")


houseModel.get("/house" ,authentication, getHouse);
houseModel.post("/house" ,authentication , addHouses);
houseModel.delete("/house/:id", authentication ,deleteHouse);
houseModel.delete("/deleteAll", deleteAll);
houseModel.put("/house", updateHouse);

module.exports = houseModel;
