const express = require("express");
const bookingRoute = express.Router();

const {addBooking , getBooking, delteBooking  } = require("../controllers/booking");
const {authentication} = require("../middlewares/authentication")

bookingRoute.post("/booking" , authentication , addBooking)
bookingRoute.get("/booking" , authentication , getBooking)
bookingRoute.delete("/booking/:id" , authentication , delteBooking)


module.exports = bookingRoute;