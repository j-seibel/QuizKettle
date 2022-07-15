const jsondoc = require('./questions.json');
const qModel = require('./models/NAQT');
const histories = require('./models/userHistory')

async function addNATQ(){
   const question = jsondoc.data.tossups;
   for(questions of question){
    if(questions.formatted_answer.indexOf('&l') > -1){
        questions.formatted_answer = questions.formatted_answer.substring(0,questions.formatted_answer.indexOf("&lt"));

    }
    qModel.create({question: questions.text, answer: questions.formatted_answer, catagory: questions.category.name, wiki: questions.wikipedia_url})
   }

  
}

async function addFeild(){
   await histories.updateMany({ $set: {"naqtquestionHistory": []} },)
}
//addFeild();
//addNATQ()







module.exports= addNATQ;