
const express = require("express");
const houseModel = express.Router();


// module.exports = {addHouses , deleteHouse  , getHouse , updateHouse , deleteAll}
// const { authentication } = require("../middleware/authentication");
const {addHouses , deleteHouseById  , getHouse , updateHouseById , getHouseById, deleteAll} = require("../controllers/houses");

const {authentication} = require("../middlewares/authentication")


houseModel.get("/houses" , getHouse);
houseModel.post("/houses" ,authentication , addHouses);
houseModel.delete("/house/:id", authentication ,deleteHouseById);
houseModel.delete("/deleteAll", deleteAll);
houseModel.put("/house", updateHouseById);

houseModel.get("/house/:id" ,authentication, getHouseById);

module.exports = houseModel;
