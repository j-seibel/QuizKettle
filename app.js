//main server logic

const express = require('express');
//const temp = require('./temp');
const app = express(); 
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: '*'}})
const login = require('./routes/register')
const report = require('./routes/report');
const stats = require('./routes/stats');
const connectDB = require('./db/connect');
const session = require('express-session');
const addQ = require('./routes/addQ');
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 5000;
require("dotenv").config()
sockets = require('./socket/sockets')(io)



app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: "secret",
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
    }),
    resave: false,
    saveUninitialized: true
  }));


app.get("/", (req, res) =>{
    res.status(200).render('index.ejs');
})

app.use('/stats', stats)
app.use('/report', report);
app.use("/login", login)
app.use('/question', addQ);


connectDB();






server.listen(PORT, ()=> console.log("server listening"));








