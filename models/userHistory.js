const mongoose = require('mongoose')
//sets up collection for users stats
const HistorySchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  questionHistory: {
    type: Array,
    default: [],
  },
  naqtquestionHistory:{
    type: Array,
    defualt: []
  }
  

})

module.exports = mongoose.model('userHistory' ,HistorySchema )