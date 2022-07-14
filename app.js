const express = require('express');
const app = express(); 
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: '*'}})
const login = require('./routes/register')
const stats = require('./routes/stats');
const connectDB = require('./db/connect');
const session = require('express-session');
const addQ = require('./routes/addQ');
require("dotenv").config()
sockets = require('./socket/sockets')(io)

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 7,
        saveUninitialized: false,
    }
}))


app.get("/", (req, res) =>{
    res.status(200).render('index.ejs');
})

app.use('/stats', stats)

app.use("/login", login)
app.use('/question', addQ);

connectDB();





server.listen(process.env.PORT, ()=> console.log("server listening"));








