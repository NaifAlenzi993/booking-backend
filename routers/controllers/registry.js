const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  userModel  = require("../../db/models/userModel")
const  activeUserModel  = require("../../db/models/activeUserModel")
const nodemailer = require("nodemailer");

const login = async (req, res) => {
    let { email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ email: email });
      const dateNow = getDate()
      const datalastActiveAt = await userModel.findOneAndUpdate({email : email} , {lastActiveAt:dateNow})
      if (user) {
        const check = await bcrypt.compare(password, user.password);
        if (check === true) {
          const payload = { userId: user._id, username: user.name , role : user.role};
          const token = jwt.sign(payload, "ABC");
          res.status(200).json({ token , userId : user._id , username: user.name , role:user.role});
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
    const dataNow = getDate()
    try {
      password = await bcrypt.hash(password, 10); 
      const newSignUp = new userModel({ name, email, password ,dateCreateAcc: dataNow , role: 2 ,lastActiveAt : 0  , img : "https://freesvg.org/img/abstract-user-flat-4.png"});
      const response = await newSignUp.save();
      res.status(201).json(response);
    } catch (error) {
      res.send(error);
    }
  }

  const signupWithActiveCode = async (req , res) => {
    let {email , name , password} = req.body

    
     const randomCode = rndStr(4) 
     password = await bcrypt.hash(password, 10); 

    const emailFound = await userModel.findOne({ email: email });
    if (emailFound){
      res.status(404).json("email found !!")
      return
    }

    
    const transport =  nodemailer.createTransport({
        service : "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
            }
        });


        transport.sendMail({
            from : process.env.EMAIL,
            to : email , 
            subject : "Booking App - Active User",
            html : `
            <div> 
            <h1>Active Code : ${randomCode}</h1> 
            </div>
            `
        } , (err , data) => {
            if (err) {
                res.status(404).json("transport Line(85): " + err)
            }else{  
              const dataNow = getDate()
              const userNew = new activeUserModel({email , name , password , codeActive: randomCode , dateCreateAcc: dataNow , role: 2 , lastActiveAt: 0 , img : "https://freesvg.org/img/abstract-user-flat-4.png"})
              userNew.save()
              res.status(201).json("sent data done !")
            }
        })
}


const sendNewCodeActive = async (req , res) => {
  const {email} = req.body
  const randomCode = rndStr(4)
  const user = await activeUserModel.findOneAndUpdate({email:email} , {codeActive:randomCode})
  const transport =  nodemailer.createTransport({
    service : "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
        }
    });

  if (user){
    transport.sendMail({
      from : process.env.EMAIL,
      to : email , 
      subject : "Booking App - Active User",
      html : `
      <div> 
      <h1>Active Code : ${randomCode}</h1> 
      </div>
      `
  })
      res.status(200).json("done = sendNewCodeActive")
  }else{
    res.send("Error = sendNewCodeActive")
  }

}

  const checkAvtiveCode =  async (req , res) => {
      const {email , code} = req.body;
      // console.log(email , code);
      const userFound =  await activeUserModel.findOne({email : email})
      try {
        const {email , password , name , role , img , dateCreateAcc ,lastActiveAt ,  codeActive} = userFound
        
        if (userFound) {
          if (code == codeActive) { 
            await activeUserModel.deleteOne({email : email})
            const newUser = new userModel({email , password , name , role , img ,dateCreateAcc , lastActiveAt , codeActive})
            await newUser.save()
            res.status(200).json("")
          }else{
            res.send("invalid Code Active")
          }
        }else {
          res.send("not found user")
        }
        
      } catch (error) {
        
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


  function getDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  function rndStr(len, charSet) {
    charSet = charSet || "0123456789ABCDFEGOPXRQWSNMCLZ";
    var randomString = "";
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }



module.exports = {login , signUp , getUserInfo , updateUserName , signupWithActiveCode , checkAvtiveCode , sendNewCodeActive}