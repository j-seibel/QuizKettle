const Question = require('./models/Question');
let newQ;

async function getRandomQ(){
    async function wrapper(){
        let count = await Question.count()
        let random = Math.floor(Math.random() * count);
        let result = await Question.findOne().skip(random)
        newQ = result;
    }

    await wrapper();
    return newQ;
   
}


module.exports = getRandomQ;