//route for registering and logging into the site

const express = require('express');
const User = require('../models/User');
const School = require('../models/Schools');
const router = express.Router()
const bcrypt = require('bcrypt');
const {getUsers} = require('../scoreboard');
const userHistory = require('../models/userHistory');
const nodemailer = require('nodemailer');


require("dotenv").config()

let EMAIL_PASS = process.env.EMAIL_PASS;

router.use(express.static('/public'));


router.route('/').get( async (req, res)=>{
    const temp = await User.findOne({session: req.sessionID})
    if(temp){
       return res.redirect('../')
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
    await School.findOneAndUpdate({name: req.body.school},{ $push: {members: req.body.username}});
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

router.route('/forgotPassword').get((req, res)=>{
    res.render('forgot.ejs');

});

router.route('/email').post( async (req, res)=>{
   const  token = (Math.random().toString(36)).replace(/[^a-z]+/g, '');
   console.log(req.body);
   console.log(token);
   const user = await User.findOneAndUpdate({email: req.body.email}, {token});
   console.log(user);
   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'quizkettle@gmail.com',
      pass: EMAIL_PASS,
    }
  });
  
  var mailOptions = {
    
    from: 'quizkettle@gmail.com',
    to: req.body.email,
    subject: 'Forgot Password',
    text: `Reset your password.
     Click or copy the link below to reset your password.
     localhost:5000/login/reset/${token};`,
    html: `<h1>Reset Your Password</h1>
    <div><p> Click <a href = www.quizkettle.com/login/forgot/${token}> Here</a> or copy the link below to reset your password</p><br>  <p>www.quizkettle.com/login/forgot/${token}</p> </div>`,

  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    res.send();
  });
   

})

router.route('/forgot/:token').get(async (req, res)=>{
    const token = req.params.token;
    const account = await User.findOne({token});
    if(account){
        res.render('reset.ejs',{token: token});
    }else{

        console.log('fuck');
    }
})

router.route('/updatePassword').post( async (req, res)=>{
    const token = req.body.token;
    console.log(token);
    await bcrypt.hash(req.body.password, 10).then(async (hash)=>{
       const user = await User.findOneAndUpdate({token}, {password: hash});
       console.log(user);
    })
    res.send(true);
})



module.exports = router;