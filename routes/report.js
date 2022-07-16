const question = require('../models/Question');
const natqquestion = require('../models/NAQT');
const express = require('express');
const router = express.Router();

router.route("/").post(async (req, res)=>{
    const changeq = req.body.question.trim();
    const edit = req.body.edit;
    const found = await question.findOne({question: changeq});
    const foundnatq = await natqquestion.findOne({question: changeq});
    console.log("found" + found);
    console.log('foundnatq' + foundnatq);
    if(found){
        await question.findOneAndUpdate({question: changeq}, {answer: found.answer + ` ,${edit}`})
    }
    if(foundnatq){
        await natqquestion.findOneAndUpdate({question: changeq}, {answer: foundnatq.answer +` <strong>${edit}</strong>`})
    }
    res.send();

})


module.exports = router;    