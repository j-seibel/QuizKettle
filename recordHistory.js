//records the history of answers
const questionHistory = require('./models/userHistory');



async function addHistory(username, correct, catagory, NAQT){
    if(!NAQT){
    await questionHistory.findOneAndUpdate({username}, {$push: {questionHistory : {correct , catagory, timestamp: new Date().getTime()}}})
    }else{
        await questionHistory.findOneAndUpdate({username}, {$push: {naqtquestionHistory : {correct , catagory, timestamp: new Date().getTime()}}})
    }

}


module.exports= addHistory;