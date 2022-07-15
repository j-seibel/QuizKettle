
const socket = io('https://quizkettle.herokuapp.com')
//const socket = io('localhost:5000')
socket.on('connection')


// handels other players buzzes
socket.on('buzz', (data)=>{
    history_div.innerHTML += `<div class = ${data.user.username}> <p class = "historyEl"> ${data.user.username}:</p> </div>`
    blockbuzz();
})

socket.on('chat', (data)=>{
    history_div.innerHTML += `<div class = ${data.user}> <p class = "historyEl chat"> ${data.user}:</p> </div>`
})
socket.on('status', (data)=>{
    questionEnd = data.questionEnd;
    history_div.innerHTML += `<div class = ${data.user}> <p class = "historyEl"> ${data.user} has joined the lobby! </p> </div>`
    if(data.sendArr){
        qBox.innerHTML = (data.sendArr);
    }
    sortTable(data.scoreList, data.schoolScoreList);
    NAQT.checked = data.settings.NAQT;

})

socket.on('NAQT',(data)=>{
    NAQT.checked = data.checked;
    console.log(data.checked);
})

socket.on('updateQ', (newQ)=>{
    qBox.innerHTML = newQ;
})
socket.on('defaultans', ()=>{
    submitans();
})

socket.on('next', (data) =>{
    resetDefaultStates();
    addQHistory(data.answer, data.oldQuestion);
    collapse();
    answer.innerHTML = "";
    catagory.innerHTML = "";
    

})

socket.on('updateTimer', (buzztimer)=>{
    timer.innerHTML = buzztimer.toFixed(1);
})

socket.on('updateEndTimer', (start_time) =>{
    timer.innerHTML = start_time.toFixed(1);
})
socket.on('timerToZero', (data)=>{
    timer.innerHTML = 0.00;
    questionEnd = true;
    questionRead = true;
    hasBuzzed = false;
    answer.innerHTML = data.answer.split(",")[0];
    catagory.innerHTML = data.catagory;
})
socket.on('resetEndTimer', ()=>{
    timer.innerHTML = 10.001.toFixed(1);
})
socket.on('updateLive' , (liveMsg)=>{
    const updateBoxArr = document.getElementsByClassName(`${liveMsg.username}`);
    const updateBox = updateBoxArr[updateBoxArr.length - 1];
    updateBox.innerHTML = `<p class = "historyEl">${liveMsg.live} </p>`;

})

socket.on('correct' , (data) =>{
    const updateBoxArr = document.getElementsByClassName(`${data.user}`);
    updateBoxArr[updateBoxArr.length - 1].innerHTML += data.status;
    answer.innerHTML = data.answer.split(",")[0];
    catagory.innerHTML = data.catagory;
    collapse();
    hasBuzzed = false;
    questionRead = true;
    qBox.innerHTML = data.question;
    sortTable(data.scoreList, data.schoolScoreList);
    
})
socket.on('incorrect' , (data) =>{
    const updateBoxArr = document.getElementsByClassName(`${data.user}`);
    updateBoxArr[updateBoxArr.length - 1].innerHTML += data.status;
    collapse();
    questionEnd = false;
    buzzer.enabled = true;
    buzzer.style.visibility = "visible"
})


// makes sure that the timer is reset and there are no default answers


function resetDefaultStates(){
    questionEnd = false;
    questionRead = false
    hasBuzzed = false;
    buzzer.enabled = true;
    buzzer.style.visibility = "visible";
    qBox.innerHTML = "";
    next_btn.enabled = false;
    timer.innerHTML = 10.001.toFixed(1)
}

ibox.addEventListener('input', updateLive);

function updateLive(){
    //live.innerHTML = ibox.value;
    socket.emit('updateLive', {live: ibox.value, user: user.username});

}

function addQHistory(ans, question){
    if(ans && ans !== ""){
    history_div.innerHTML += `
    <div class="content">
      <p>${question}</p>
    </div>
    <button type="button" class="collapsible">${ans}</button>`
    }
}
