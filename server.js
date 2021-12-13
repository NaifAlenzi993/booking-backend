const express = require("express")
const cors = require("cors")

require("./db/db");

const app = express()
app.use(express.json());
app.use(cors());
const port = 5000
///////////

const houseRoute = require("./routers/routes/housesRoute")
app.use(houseRoute)
const signUpRoute = require("./routers/routes/signUpRoute")
const loginRoute  = require("./routers/routes/loginRoute")
const  userRoute = require("./routers/routes/userRoute")
app.use(signUpRoute)
app.use(loginRoute)
app.use(userRoute)

///////////
app.listen( port , ()=>{
    console.log("server is runing on Port : " + port);
})



