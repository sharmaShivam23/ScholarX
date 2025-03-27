const express = require("express")
const app = express()

const PORT = 3000

app.use(express.json())

app.listen(PORT, () => {
  console.log("post is running on 3000");
})


const database = require('./config/databse') 
database()
