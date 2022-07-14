const history = require('../models/userHistory');
const express = require('express');
const router = express.Router();

router.route("/").get((req, res)=>{
    res.render("info.ejs");
})


module.exports = router;