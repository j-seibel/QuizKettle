const mongoose = require('mongoose')

//sets up collection for questions of KnolageMaster style

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer:{
  },
  catagory:{
    type: String,

  },
})


module.exports = mongoose.model('Question', QuestionSchema)