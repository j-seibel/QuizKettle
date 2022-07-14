const Question = require('./models/Question');

async function add(){
    await Question.create({
        "number": 1,
        "question": "if this doesn't work I am going to commit die",
        "answer": "yes",
        "catagory": "history"
        
      })
}

module.exports = add;