const mongoose = require('mongoose');
require("dotenv").config()



// connects to database
async function QuestionDB(){
    console.log("connected to db");
    return mongoose.connect(process.env.DB_URI);
 }

 



module.exports = QuestionDB;

