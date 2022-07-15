const players = document.getElementsByClassName('Player');
const scores = document.getElementsByClassName('Score');
const schools = document.getElementsByClassName('school')
const schoolScores = document.getElementsByClassName('schoolScore')

function sortTable(scoreList , schoolScoreList){
    scoreList.sort((a,b)=> (a.score <b.score)? 1: -1);
    const myScore = scoreList.find(score => score.username === user.username);
    scoreList.splice(scoreList.indexOf(myScore),1);
    let newScores = [myScore, scoreList[0], scoreList[1], scoreList[2], scoreList[3]];
    newScores.sort((a,b)=> (a.score <b.score)? 1: -1);
    schoolScoreList.sort((a,b)=> (a.score <b.score)? 1: -1);
    const mySchoolScore = schoolScoreList.find(score => score.name === user.school);
    schoolScoreList.splice(schoolScoreList.indexOf(mySchoolScore),1);
    let newSchoolScores = [mySchoolScore, schoolScoreList[0], schoolScoreList[1]];
    newSchoolScores.sort((a,b)=> (a.score <b.score)? 1: -1);
    
    
    
    for(var i =0; i< 5; i++){
       players[i].innerHTML = newScores[i].username;
        scores[i].innerHTML = newScores[i].score;
        if(i < 3){
            schools[i].innerHTML = newSchoolScores[i].name;
            schoolScores[i].innerHTML = newSchoolScores[i].score;
        }
        
    }
    

}