const express = require('express');
const User = require('../models/User');
const School = require('../models/Schools');
const router = express.Router()
const bcrypt = require('bcrypt');
const {getUsers} = require('../scoreboard');
const userHistory = require('../models/userHistory');


router.route('/').get( async (req, res)=>{
    const temp = await User.findOne({session: req.sessionID})
    if(temp){
        return res.render('index.ejs')
    }
    res.render('login.ejs')})
.post(async (req, res)=>{
    logUser = await User.findOne({email: req.body.email})
    if(logUser){
        const dbPassword = logUser.password;
        const loggedPassword = req.body.password;
       bcrypt.compare(loggedPassword, dbPassword).then((result)=>{
       test =  async ()=>{
           if(result){
           await User.findOneAndUpdate({email: logUser.email}, {session: req.session.id});
           getUsers();
           }
           res.status(200).send(result);
        }
        test();
            
    })    
    }else{
        res.status(200).send(false);
    }
})

router.route('/register').post( async (req, res)=>{
   const repeatUsername = await User.findOne({username:req.body.username})
   const repeatEmail = await User.findOne({email:req.body.email})
    if(repeatEmail){
        return res.send({error: 'Email already has account'})
    }
    if(repeatUsername){
        return res.send({error:"Username already Exists"})
    }
    bcrypt.hash(req.body.password, 10).then((hash)=>{
        req.body.password = hash;
        User.create(req.body);
        userHistory.create({username: req.body.username});
        

    });
    await School.findOneAndUpdate({name: req.body.school},{$inc : {members: 1}})
    res.send();
}).get((req,res)=>{
    res.render('register.ejs');
})

router.route('/user').get( async (req,res)=>{
    const currentUser = await User.findOne({session: req.sessionID});
    if(currentUser){
        res.status(200).send(currentUser)
    }else{
        res.send(false);
    }
})



module.exports = router;