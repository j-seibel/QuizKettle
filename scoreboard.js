const User = require('./models/User');
const School = require('./models/Schools');

let userScores;
let schoolScores;



function getUsers(){
    async function wrapper(){
    userList = await  User.find();
   userList = userList.map( user=> ({username: user.username, score: user.score, school: user.school}))
   return userList
    }
    wrapper().then((userList)=>{
        userScores = userList

    }
    )
}

function getSchools(){
    async function wrapper(){
    schoolList = await  School.find();
    schoolList = schoolList.map( school=> ({name: school.name, score: school.score}))
    return schoolList
    }
    wrapper().then((schoolList)=>{
        schoolScores = schoolList;
    })

}

function getScoreList(){
    return userScores
}

function getSchoolScoreList(){
    return schoolScores;

}

getUsers();
getSchools();



function updateScore(username){
    userScores.forEach((user)=>{
        if(user.username === username){
        user.score += 10
        schoolScores.forEach((school)=>{
            if(user.school === school.name){
                school.score += 10;
                console.log(user.school, school.name);
                updateScoreDB(username, school.name);
            }
        })
        
        }
       
    })
}

async function updateScoreDB(username,school){
        await User.findOneAndUpdate({username}, {$inc: {score: 10}});
        const schooldoc = await School.findOneAndUpdate({name: school}, {$inc: {score: 10}})
    }


function linkSocket(username, socketID){
    for (user of userList){
        if(user.username === username){
            user.socketID = socketID;
        }
    }




}



module.exports = {getUsers, updateScore, updateScoreDB, linkSocket, getScoreList, getSchoolScoreList};