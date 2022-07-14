const history = require('../models/userHistory');
const express = require('express');
const router = express.Router();

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

module.exports = router;