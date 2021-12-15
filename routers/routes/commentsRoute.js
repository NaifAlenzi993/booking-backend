const express = require("express");
const commentModel = express.Router();

const {addComment } = require("../controllers/comments");
const {authentication} = require("../middlewares/authentication")

commentModel.post("/addcomment" , authentication , addComment)


module.exports = commentModel;