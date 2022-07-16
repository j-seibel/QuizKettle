const history = require('../models/userHistory');
const express = require('express');
const router = express.Router();
const schools = require('../models/Schools');

router.route("/").get((req, res)=>{
    if(!req.sessionID){
        return res.render('login.ejs')
    }
    res.render("stats.ejs");
})

router.route('/history').post(async (req,res)=>{
    const data = await history.findOne({username: req.body.username});
    res.send(data);

})

router.route('/coach').get((req, res)=>{
    res.render('coachStats.ejs');
})

router.route('/coach/players').post(async (req, res)=>{
    console.log(req.body.school);
    school = await schools.findOne({name: req.body.school});
    res.send(school.members);
});

module.exports = router;