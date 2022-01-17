
const express = require("express");
const houseRoute = express.Router();


// module.exports = {addHouses , deleteHouse  , getHouse , updateHouse , deleteAll}
// const { authentication } = require("../middleware/authentication");
const {addHouses , deleteHouseById  , getHouse , updateHouseById , getHouseById, deleteAll ,getInfoUser , getAllFavByUserId , getAllHouseByUserId} = require("../controllers/houses");

const {authentication} = require("../middlewares/authentication")


houseRoute.get("/houses" , getHouse);
houseRoute.post("/houses" ,authentication , addHouses);
houseRoute.delete("/house/:id", authentication ,deleteHouseById);
houseRoute.delete("/deleteAll", deleteAll);
houseRoute.put("/house", updateHouseById);

houseRoute.get("/house/:id" ,authentication, getHouseById);

houseRoute.get("/get-user-info/:id" , authentication , getInfoUser)

houseRoute.get("/get-houses/:id" , authentication , getAllHouseByUserId)
houseRoute.get("/get-favs/:id" , authentication , getAllFavByUserId)

module.exports = houseRoute;
