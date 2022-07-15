const Question = require('./models/Question');
const NAQT = require('./models/NAQT')
var questionArr;
var NAQTquestionArr;
async function loadQuestions(){
    questionArr = await Question.find();
    NAQTquestionArr = await NAQT.find();
    console.log('questions loaded')

}

async function getRandomQ(NATQ){
    if(NATQ){
    const rand = Math.round((Math.random() * NAQTquestionArr.length))
    return NAQTquestionArr[rand];
    }else{
    const rand = Math.round((Math.random() * questionArr.length))
    return questionArr[rand];
    }
}




module.exports = {getRandomQ, loadQuestions};