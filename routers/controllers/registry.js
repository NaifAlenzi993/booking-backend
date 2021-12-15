const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  userModel  = require("../../db/models/userModel")

const login = async (req, res) => {
    let { email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ email: email });
      const dateNow = new Date()
      const datalastActiveAt = await userModel.findOneAndUpdate({lastActiveAt : dateNow})
      if (user) {
        const check = await bcrypt.compare(password, user.password);
        if (check === true) {
          const payload = { userId: user._id, username: user.name };
          const token = jwt.sign(payload, "ABC");
          res.status(200).json({ token , userId : user._id , username: user.name , type:user.type});
          // res.status(200).json(`Hello admain! ${user.name}`);
        } else {
          res.status(403).json("wrong PassWord!");
        }
      } else {
        res.status(404).json("wrong Email!");
      }
    } catch (error) {
      res.send(error);
    }
  };


  const signUp = async (req, res) => {
    let { name, email, password } = req.body;
    const emailFound = await userModel.findOne({ email: email });
    if (emailFound){
      res.status(404).json("email found !!")
      return
    }
    const dataNow = new Date()
    try {
      password = await bcrypt.hash(password, 10); 
      const newSignUp = new userModel({ name, email, password ,dateCreateAcc: dataNow , type: 2 ,lastActiveAt : 0});
      const response = await newSignUp.save();
      res.status(201).json(response);
    } catch (error) {
      res.send(error);
    }
  }

  const getUserInfo = async (req, res) => {
    try {
      const userId = req.token.userId;
      const userInfo = await userModel.findOne({ _id: userId });
      res.status(200).json(userInfo);
    } catch (error) {
      res.send("err in token");
    }
  };
  
  const updateUserName = async (req, res) => {
    const { newName } = req.body;
    try {
      const userId = req.token.userId;
      const response = await userModel.findOneAndUpdate(
        { _id: userId },
        { name: newName },
        { new: true }
      );
      res.status(200).json(response);
    } catch (error) {
      res.send("err in token");
    }
  };




module.exports = {login , signUp , getUserInfo , updateUserName}