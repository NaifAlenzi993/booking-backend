// const jwt = require("jsonwebtoken");


const authorization = (req, res, next) => {

    //   const token = req.headers.authorization.split(" ")[1];
      // console.log(token);
    //   const valid = jwt.verify(token, "ABC");
    if (req.token){
        if (req.token.role == 0){
            next();
        } else {
            res.status(403);
            res.send(error);
        }
    }
    

  };


  module.exports = {authorization}