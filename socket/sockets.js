const validate = require('../validator')
const getRandomQ = require('../getRandomQ');
const { updateScore, linkSocket, getScoreList, getSchoolScoreList} = require('../scoreboard');
const addHistory = require('../recordHistory');
let hasBuzzed = false;
let questionEnd = true;
let questionRead = true;
let defaultans;
let readID;
let endTimerID;
let start_time = 10.001;
let oldQuestion = "";
let nextAnswer = "";
let oldAnswer = "";
let ans = "";
let catagory= ""
let oldCatagory =""
let nextCatagory = "";
let question =  getRandomQ().then(result=>{
    question = result.question;
    ans = result.answer;
    catagory = result.catagory;
});
let nextQuestion = getRandomQ().then(result=>{
    nextQuestion = result.question;
    nextAnswer = result.answer;
    nextCatagory = result.catagory;
});
let user = null;
let sendArr;



module.exports = function(io){
    io.on('connection', (socket) =>{
        console.log(socket.id);

        socket.on('status',  (data)=>{
            if(data){
          linkSocket(data.username, socket.id)
            }
            io.to(socket.id).emit('status', {questionEnd, sendArr, scoreList: getScoreList(), schoolScoreList: getSchoolScoreList()} )
            
        })

        socket.on('read', ()=>{
            const read =  () => {
                firstQ = false;
                let qArr = question.split(' ');
                let wordIndex = 0;
                sendArr ="";
                readID = setInterval(function () {
                   if (!hasBuzzed && !questionRead) {
                       sendArr += qArr[wordIndex] + " ";
                       wordIndex++;
                       io.emit('updateQ',sendArr)
                   }
                   if (qArr.length === wordIndex) {
                       questionRead = true;
                       clearInterval(readID);
                       endTimerID = setInterval(()=>{
                        if(!hasBuzzed){
                        start_time -=0.2;
                        io.emit('updateEndTimer', start_time);
                        }
                        if(start_time < 0.2){
                            start_time =10.001;
                            questionEnd = true;
                            questionRead = true;
                            clearInterval(endTimerID);
                            io.emit('timerToZero');
                        }
        
                       }, 200);
                       // sets up end of question timer
                   }
            
               }, 200);
            
            
            }
            clearInterval(readID);
            read();
        })
    
        socket.on('buzz', (data)=>{
            user = data.user;
            hasBuzzed = true;
            let anstime = 7.001
            sendArr += "<i class='fa-solid fa-stop'></i> "
            const buzztimer = setInterval(()=>{
                if(hasBuzzed){
                    anstime -= 0.2;
                    io.emit('updateTimer', anstime);
                }else{
                    clearInterval(buzztimer)
                }
                

            }, 200);
            defaultans = setTimeout(()=>{
                io.to(data.id).emit('defaultans')
                //socket.broadcast.emit('submit');
            }, 7000);


            socket.broadcast.emit('buzz', data);
        })
    
        socket.on('submit', (data)=>{
            
            socket.broadcast.emit('submit', data);
        })
    
        socket.on('next', ()=>{
            questionEnd = false;
            questionRead = false;
            io.emit('next', {oldQuestion, answer: oldAnswer.split(",")[0].trim()});
            oldQuestion = question
            question = nextQuestion
            oldAnswer = ans;
            ans = nextAnswer;
            oldCatagory = catagory
            catagory = nextCatagory;
            nextQuestion = getRandomQ().then(result =>{
                nextQuestion = result.question;
                nextAnswer = result.answer;
                nextCatagory = result.catagory;
            });
        })

        socket.on('updateLive', (data)=>{
            live = `${data.user}:` + data.live
            io.emit('updateLive', {live, username: data.user});
        })

        socket.on('validate', (data)=>{
            clearTimeout(defaultans);
            hasBuzzed = false;
            const right = validate(data.playerAnswer.toLowerCase(), oldAnswer.toLowerCase())
            if(right){
                updateScore(data.username);
                const status = `<p class = 'historyEl correct'>correct</p> `;
                const newData = {correct: true, status, answer: oldAnswer, user: data.username, catagory: oldCatagory, question: oldQuestion, scoreList: getScoreList(), schoolScoreList: getSchoolScoreList()};
                io.emit('correct' , newData)
                questionRead = true;
                questionEnd = true;
                clearInterval(endTimerID);
                io.emit('resetEndTimer')
               
            }else{
                const status = `<p class = 'historyEl incorrect'>incorrect</p>`;
                const newData = {correct: false, status};
                io.emit('incorrect' , newData)
                io.emit('updateEndTimer', start_time);

            }
            addHistory(data.username, right, oldCatagory );
        })
        socket.on('chat', (data)=>{
            socket.broadcast.emit('chat', data);
        })
    })
    
}