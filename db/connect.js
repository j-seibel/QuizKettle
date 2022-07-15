const mongoose = require('mongoose');
require("dotenv").config()

let DB_URI = process.env.DB_URI;





// connects to database
async function QuestionDB(){
    console.log("connected to db");
    return mongoose.connect(DB_URI);
 }

 



module.exports = QuestionDB;

