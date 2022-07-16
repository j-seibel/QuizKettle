const validate = require('../validator');
const validateNAQT = require('../NAQTvalidator');
const {getRandomQ, loadQuestions} = require('../getRandomQ');
const { updateScore, linkSocket, getScoreList, getSchoolScoreList} = require('../scoreboard');
const addHistory = require('../recordHistory');
let hasBuzzed = false;
let questionEnd = true;
let questionRead = true;
let defaultans;
let readID;
let NAQT = true;
let endTimerID;
let start_time = 10.001;
let oldQuestion = "";
let oldAnswer = "";
let ans = "";
let catagory= ""
let oldCatagory =""
let question = ""
let nextQuestion = "";
let nextCatagory = '';
let nextAnswer = "";
let NAQTcategoryArray=['History','Science','Geography','Fine Arts','Current Events','Mythology','Religion','Philosophy','Social Studies','Literature','Trash'];
let KMcategoryArray =['History','Geography','Math','Science','Lit','Grammer','Other']
let questionsetup = async ()=>{
    await loadQuestions()
    refreshQs();

}
questionsetup();
let sendArr;



function refreshQs(){
    getRandomQ(NAQT,KMcategoryArray, NAQTcategoryArray).then((temp)=>{
            question = temp.question;
            ans = temp.answer;
            catagory = temp.catagory;
    }).catch();
    getRandomQ(NAQT,KMcategoryArray, NAQTcategoryArray).then((temp)=>{
        
        nextQuestion = temp.question;
        nextAnswer = temp.answer;
        nextCatagory = temp.catagory;
        
    }).catch();

}
   
   
    




module.exports = function(io){
    io.on('connection', (socket) =>{
        console.log(socket.id);

        socket.on('status',  (data)=>{
            if(data){
          linkSocket(data.username, socket.id)
            }
            NAQT ? io.to(socket.id).emit('category', {settings: NAQTcategoryArray, NAQT}) :io.to(socket.id).emit('category', {settings: KMcategoryArray, NAQT})
            io.to(socket.id).emit('NAQT', {checked: NAQT});
            io.to(socket.id).emit('status', {questionEnd, sendArr, scoreList: getScoreList(), schoolScoreList: getSchoolScoreList(), user: data.user, settings:{NAQT: NAQT}} )
            
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
                        start_time -=0.1;
                        io.emit('updateEndTimer', start_time);
                        }
                        if(start_time < 0.1){
                            start_time =10.001;
                            questionEnd = true;
                            questionRead = true;
                            clearInterval(endTimerID);
                            io.emit('timerToZero', ({answer: oldAnswer, catagory: oldCatagory}));
                        }
        
                       }, 100);
                       // sets up end of question timer
                   }
            
               }, 200);
            
            
            }
            clearInterval(readID);
            read();
        })
    
        socket.on('buzz', (data)=>{
            if(!hasBuzzed){
            user = data.user;
            hasBuzzed = true;
            let anstime = 10.01;
            sendArr += "<i class='fa-solid fa-stop'></i> "
            const buzztimer = setInterval(()=>{
                if(hasBuzzed){
                    anstime -= 0.1;
                    io.emit('updateTimer', anstime);
                }else{
                    clearInterval(buzztimer)
                }
                

            }, 100);
            defaultans = setTimeout(()=>{
                io.to(data.id).emit('defaultans')
                //socket.broadcast.emit('submit');
            }, 10000);


            socket.broadcast.emit('buzz', data);
            }
        })
    
        socket.on('submit', (data)=>{
            
            socket.broadcast.emit('submit', data);
        })
    
        socket.on('next', async ()=>{
            questionEnd = false;
            questionRead = false;
            io.emit('next', {oldQuestion, answer: oldAnswer.split(",")[0].trim(), question});
            oldQuestion = question
            question = nextQuestion
            oldAnswer = ans;
            ans = nextAnswer;
            oldCatagory = catagory
            catagory = nextCatagory;
            getRandomQ(NAQT,KMcategoryArray, NAQTcategoryArray).then((temp)=>{
                nextQuestion = temp.question;
                nextAnswer = temp.answer;
                nextCatagory = temp.catagory;
            }).catch();
            });

        socket.on('updateLive', (data)=>{
            live = `${data.user}:` + data.live
            io.emit('updateLive', {live, username: data.user});
        })

        socket.on('validate', (data)=>{
            clearTimeout(defaultans);
            hasBuzzed = false;
            const right = NAQT ? validateNAQT(data.playerAnswer.toLowerCase(), oldAnswer.toLowerCase()):validate(data.playerAnswer.toLowerCase(), oldAnswer.toLowerCase())
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
                const newData = {correct: false, status, user: data.username};
                io.emit('incorrect' , newData)
                io.emit('updateEndTimer', start_time);

            }
            addHistory(data.username, right, oldCatagory, NAQT );
        })
        socket.on('chat', (data)=>{
            socket.broadcast.emit('chat', data);
        })
        socket.on('NAQT', (data)=>{
            NAQT = data.checked
            refreshQs();
            socket.broadcast.emit('NAQT', {checked: NAQT});
        })
        socket.on('category', (data)=>{
            if(NAQT){
                NAQTcategoryArray = data;
                socket.broadcast.emit('category', {settings: NAQTcategoryArray, NAQT})
            }else{
                KMcategoryArray = data;
                socket.broadcast.emit('category', {settings: KMcategoryArray, NAQT})

            }
            refreshQs();
        })
})
}