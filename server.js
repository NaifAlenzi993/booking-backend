const express = require("express")
const cors = require("cors")

require("./db/db");

const app = express()
app.use(express.json());
app.use(cors());
const port = 5000
///////////
const bookingRoute = require("./routers/routes/bookingRoute")
const commentRoute = require("./routers/routes/commentsRoute")
const FavRoute = require("./routers/routes/FavRoute")
const houseRoute = require("./routers/routes/housesRoute")
const signUpRoute = require("./routers/routes/signUpRoute")
const loginRoute  = require("./routers/routes/loginRoute")
const userRoute = require("./routers/routes/userRoute")
const dashboardRoute = require("./routers/routes/dashboardRoute")

app.use(bookingRoute)
app.use(commentRoute)
app.use(FavRoute)
app.use(houseRoute)
app.use(signUpRoute)
app.use(loginRoute)
app.use(userRoute)
app.use(dashboardRoute)

///////////
app.listen( port , ()=>{
    console.log("server is runing on Port : " + port);
})



