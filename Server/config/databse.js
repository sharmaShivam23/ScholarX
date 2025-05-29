require('dotenv').config()
const mongoose = require("mongoose")

const database = async() => {
  mongoose.connect(process.env.URL)
  try{
    console.log("successfully connect with database");

  }catch(err){
    console.log(err);
    console.log("failed to connect with database");
    process.exit(1)
  }
}

module.exports = database