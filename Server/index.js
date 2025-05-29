const express = require("express")
require('dotenv').config()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const {cloudinaryConnect} = require("./config/cloudinary")
const app = express()
const fileUpload = require("express-fileupload")


app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin : ["http://localhost:5173","http://localhost:3000","http://localhost:5174"],
  methods : ["GET","POST","PUT","DELETE"],
  credentials : true
}))
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : "/tmp/"
}))

app.listen(process.env.PORT, () => {
  console.log("port is running on 3000");
})



//routes
const routes = require("./routes/Route")
app.use("/scholarX", routes);


const database = require('./config/databse') 
database()

cloudinaryConnect()
