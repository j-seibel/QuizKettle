const mongoose = require('mongoose')

//sets up database collection for questions of the NAQT style/

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