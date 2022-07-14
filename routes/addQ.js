const User = require('../models/Question');
const express = require('express');
const router = express.Router();

router.route("/").post(async (req, res) =>{
    await User.create(req.body);
    res.end();
}).get((req, res)=> res.render("addQ.ejs"));

module.exports = router;