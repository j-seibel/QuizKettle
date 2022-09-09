// Javascript for main page
const qBox = document.getElementById('questionP');
const form = document.querySelector('.ans-form');
const ibox = document.getElementById('ansBox');
const buzzer = document.getElementById('buzz');
const next_btn = document.getElementById('next');
const timer = document.getElementById('timer');
const history_div = document.getElementById('history-container')
const live = document.getElementById('live')
const answer = document.getElementById('answer');
const catagory = document.getElementById('catagory');
const reportBox = document.getElementById('newAnsBox');
const switchKM = document.getElementById('switchKM');
const switchNAQT = document.getElementById('switchNAQT')
const KMcategoryArray = document.getElementsByClassName('KMinput');
const NAQTcategoryArray = document.getElementsByClassName('NAQTinput')
let user;
let hasBuzzed = false;
let questionEnd = false;
let questionRead = false;
let chat = false;
let buzzedNow = false;
let totalquestion;





//starts the read fucntion by seting a timeout interval on each word allowing for other actions to take place
//need to add a check for question end;


// resets the question variables and starts the next question - only active when previous question was done
function nextQ() {
    if (questionEnd && !hasBuzzed) {
        socket.emit('read');
        socket.emit('next');
    }
}


//sets up timer after question is done has to be a way to optimise this but idk how


//controls ending the question when the end of question timer is finished
//handels the users buzz timeout is buzzer timer

function buzz() {
    if(!questionEnd && !hasBuzzed && !chat ){
    ibox.disabled = false;
    buzzedNow = true;
    qBox.innerHTML += `<i class="fa-solid fa-stop"></i>`;
    history_div.innerHTML += `<div class = ${user.username}> <p class = "historyEl"> ${user.username}:</p> </div>`;
    hasBuzzed = true;
    ibox.focus();
    socket.emit('buzz', {id: socket.id, user});
    blockbuzz();
    }
}
// resets end timer when it is interupted by a buzz;
//turns off buzzer and sets timer for all clinets
function blockbuzz(){
    questionEnd = true;
    disableBuzz();
}
// disables the buzzer

function disableBuzz(){
    buzzer.enabled = false;
    buzzer.style.visibility = "hidden"
    

}


// handels and validates users answer to question
function submitans() {
   const playerAnswer = ibox.value.trim();
    socket.emit('validate', {playerAnswer, username: user.username});
    ibox.value = "";
    ibox.disabled = true;
    ibox.blur();
    buzzedNow = false;
    
}

//submits and processes a users chat message

function submitChat(){
    ibox.value = "";
    ibox.disabled = true;
    ibox.blur();
    chat = false;

}

// event listeners for hot keys --- space = buzz, n = next, enter = chat

ibox.onkeydown = (e) => {
    if (e.keyCode === 13) {
        if(!chat){
            submitans();
    }else{
        if(!buzzedNow)
            submitChat();
        }
    }

}
reportBox.onkeydown = async (e) => {
    if (e.keyCode === 13) {
        const newAns = reportBox.value;
        await axios.post('/report', {question, edit: newAns} );
        reportBox.style.visibility = "hidden";
        reportBox.value = "";

    }

}


document.body.onkeydown = (e) => {
    if(e.target.nodeName !== "INPUT"){
    switch (e.key) {
        case " ":
            if (!questionEnd && !hasBuzzed){
                buzz();
                
            }
            break;
        case "n":
            nextQ();
            break;
        case "Enter":
            chat = true;
            socket.emit('chat', {user: user.username})
            history_div.innerHTML += `<div class = "${user.username} chat"> <p class = "historyEl"> ${user.username}:</p> </div>`;
            ibox.disabled = false;
            ibox.focus();
            break;
    }


    }
}

//read();

async function resumeSession(){
   user = await axios.get("/login/user")
   if(!user || !user.data){
     location.href = '/login';
   }
   getStatus();
   user = user.data;

}
function getStatus(){
    
 socket.emit('status' ,{user: user.data.username});

}

function collapse(){
    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.previousElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
}

for(var i = 0; i< KMcategoryArray.length; i +=1){
    KMcategoryArray[i].addEventListener('input', ()=>{
        let checkstatus = [];
        for(var j =0; j<KMcategoryArray.length; j+=1){
            if(KMcategoryArray[j].checked)
            checkstatus.push(KMcategoryArray[j].value)
        }
        socket.emit("category", checkstatus)
    })
}

for(var i = 0; i< NAQTcategoryArray.length; i +=1){
    NAQTcategoryArray[i].addEventListener('input', ()=>{
        let checkstatus = [];
        for(var j =0; j<NAQTcategoryArray.length; j+=1){
            if(NAQTcategoryArray[j].checked)
            checkstatus.push(NAQTcategoryArray[j].value)
        }
        socket.emit("category", checkstatus)
    })
}

function enableNATQ(){
    switchNAQT.disabled = true;
    switchKM.disabled = false;
    $('#KMcategorySettings').css({"display": "none"})
    $('#NAQTcategorySettings').css({"display": "block"})
    socket.emit("NAQT", {checked: true});

}

function enableKM(){
    switchNAQT.disabled = false;
    switchKM.disabled = true;
    $('#KMcategorySettings').css({"display": "block"})
    $('#NAQTcategorySettings').css({"display": "none"})
    socket.emit("NAQT", {checked: false});
}


$('#reportButton').on('click',(e)=>{
    if(reportBox.style.visibility === 'hidden'){
    $('#newAnsBox').css({"visibility": "visible"});
    $('#newAnsBox').focus();
    }else{
        async function wrapper(){
        const newAns = reportBox.value;
        await axios.post('/report', {question, edit: newAns} );
        reportBox.style.visibility = "hidden";
        reportBox.value = ""
        }
        wrapper();

    }
})




resumeSession()








