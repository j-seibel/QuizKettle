const mongoose = require('mongoose')

//sets up collection for questions

const NAQTQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer:{
  },
  catagory:{
    type: String,

  },
  wiki:{
    type: String,
  }
})


module.exports = mongoose.model('NAQTQuestion', NAQTQuestionSchema)