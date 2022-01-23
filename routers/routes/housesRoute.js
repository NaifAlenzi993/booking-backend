
const express = require("express");
const houseRoute = express.Router();


// module.exports = {addHouses , deleteHouse  , getHouse , updateHouse , deleteAll}
// const { authentication } = require("../middleware/authentication");
const {addHouses , deleteHouseById  , getHouse , updateHouseById , getHouseById, deleteAll ,getInfoUser , getAllFavByUserId , getAllHouseByUserId} = require("../controllers/houses");

const {authentication} = require("../middlewares/authentication")


houseRoute.get("/houses" , getHouse);//OK
houseRoute.post("/houses" ,authentication , addHouses);//OK
houseRoute.delete("/house/:id", authentication ,deleteHouseById);//OK
// houseRoute.delete("/deleteAll", deleteAll);
houseRoute.put("/house/", updateHouseById); //OK

houseRoute.get("/house/:id" ,authentication, getHouseById); //OK

houseRoute.get("/get-user-info/:id" , authentication , getInfoUser) //OK

houseRoute.get("/get-houses/:id" , authentication , getAllHouseByUserId) //OK
houseRoute.get("/get-favs/:id" , authentication , getAllFavByUserId) //OK

module.exports = houseRoute;
