const express = require("express");
const commentRoute = express.Router();

const {addComment , getComments} = require("../controllers/comments");
const {authentication} = require("../middlewares/authentication")

commentRoute.post("/comment" , authentication , addComment)
commentRoute.get("/comment/:id" , authentication , getComments)


module.exports = commentRoute;