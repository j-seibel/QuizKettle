const mongoose = require('mongoose');
require("dotenv").config()

const aws = require('aws-sdk');

let s3 = new aws.S3({
  DB_URI: process.env.DB_URI,
});

console.log(s3.DB_URI);



// connects to database
async function QuestionDB(){
    console.log("connected to db");
    return mongoose.connect(s3.DB_URI);
 }

 



module.exports = QuestionDB;

