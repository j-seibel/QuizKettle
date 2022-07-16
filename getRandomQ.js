const Question = require('./models/Question');
const NAQT = require('./models/NAQT')
var questionArr;
var NAQTquestionArr;
async function loadQuestions(){
    questionArr = await Question.find();
    NAQTquestionArr = await NAQT.find();
    console.log('questions loaded')

}

 async function getRandomQ(NATQ, KMcategoryArray, NAQTcategoryArray){
    if(NATQ){
         var newQarray = await NAQTquestionArr.filter((question)=> NAQTcategoryArray.indexOf(question.catagory) > -1 )
        if(newQarray.length === 0 || !newQarray){
            newQarray = await NAQTquestionArr.filter((question)=> question.catagory === "Dont Crash");
            const rand = Math.floor((Math.random() * newQarray.length))
            return newQarray[rand];            
        }else{
            const rand = Math.floor((Math.random() * newQarray.length))
            return newQarray[rand];
        }
        
    }else{
         var  newQarray =  await questionArr.filter((question)=> KMcategoryArray.indexOf(question.catagory) > -1)
        if(newQarray.length === 0 || !newQarray){
            newQarray =  questionArr.filter((question)=> question.catagory === "Dont Crash");
            const rand = Math.floor((Math.random() * newQarray.length))
            //console.log(newQarray);
            return newQarray[rand];
        }
        const rand = Math.floor((Math.random() * newQarray.length))
        return newQarray[rand];
    }
}




module.exports = {getRandomQ, loadQuestions};