const questionHistory = require('./models/userHistory');



async function addHistory(username, correct, catagory){
    await questionHistory.findOneAndUpdate({username}, {$push: {questionHistory : {correct , catagory, timestamp: new Date().getTime()}}})


}


module.exports= addHistory;