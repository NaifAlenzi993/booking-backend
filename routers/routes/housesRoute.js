
const express = require("express");
const houseModel = express.Router();


// module.exports = {addHouses , deleteHouse  , getHouse , updateHouse , deleteAll}
// const { authentication } = require("../middleware/authentication");
const {addHouses , deleteHouse  , getHouse , updateHouse , getHouseParams, deleteAll} = require("../controllers/houses");

const {authentication} = require("../middlewares/authentication")


houseModel.get("/houses" ,authentication, getHouse);
houseModel.post("/house" ,authentication , addHouses);
houseModel.delete("/house/:id", authentication ,deleteHouse);
houseModel.delete("/deleteAll", deleteAll);
houseModel.put("/house", updateHouse);

houseModel.get("/house/:id" ,authentication, getHouseParams);

module.exports = houseModel;
