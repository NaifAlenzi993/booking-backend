const jwt = require("jsonwebtoken");


const authentication = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      const valid = jwt.verify(token, "ABC");
      req.token = valid;
      next();
    } catch (error) {
      res.status(403);
    //   console.log("err");
      res.send(error);
    }
  };

  module.exports = {authentication}