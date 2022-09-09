
//Displays all charts for a registered team, allowing for easy comparison

const chartDiv = document.getElementById('chartDiv');



const day = 24 * 60 * 60 * 1000;
const week = 7 * day;
const month = 30 * day;
const year = 365 *day;
let timeArr = [week,month,year];
const d = new Date();
let playerdata = [];
let players;
let ctxArr = [];


init();
async function init(){
    await setup();
    charts();

}


async function setup(){
    await resumeSession();
     players = (await axios.post('/stats/coach/players',{
        school: user.school
    })).data;
    console.log(players);
    for(var i = 0; i< players.length; i+=1){
        playerdata.push( await axios.post('../stats/history', {
            username: players[i]
        }));
    }
}
        
    function charts(){
        console.log(playerdata);
        console.log(players);
        for(var j = 0; j < playerdata.length; j += 1){
            let personalDiv = document.createElement('div');
            personalDiv.setAttribute('class' , 'personalDiv');
            let canvas = document.createElement('canvas');
            canvas.setAttribute('id', `km${players[j]}`);
            canvas.setAttribute('width', '400');
            canvas.setAttribute('height', '400');
            let canvasContainer = document.createElement('div');
            canvasContainer.appendChild(canvas);
            personalDiv.appendChild(canvasContainer);
            let canvas2 = document.createElement('canvas');
            canvas2.setAttribute('id', `natq${players[j]}`);
            canvas2.setAttribute('width', '400');
            canvas2.setAttribute('height', '400');
            let canvasContainer2 = document.createElement('div');
            canvasContainer2.appendChild(canvas2);
            personalDiv.appendChild(canvasContainer2);
            chartDiv.appendChild(personalDiv);
            

        
        ctxArr.push({kmctx: document.getElementById(`km${players[j]}`).getContext('2d'), naqtctx: document.getElementById(`natq${players[j]}`), kmdata: kmChart(playerdata[j]), natqdata: naqtChart(playerdata[j])});
        console.log(ctxArr);
        }

        for(var i =0; i< ctxArr.length; i+=1){
            renderChart(ctxArr[i].kmctx, ctxArr[i].kmdata, players[i], 'Knowelage Master');
            renderChart(ctxArr[i].naqtctx, ctxArr[i].natqdata, players[i], "NAQT");

        }
        console.log('done!');
        

    }
    


async function resumeSession(){
    user = await axios.get("/login/user")
    if(!user || !user.data){
     location.href = './login'
    }
    user = user.data;
 
 }


 function naqtChart(history){
    let natqhistory;
    let natqweekData = [];
    let natqmonthData = [];
    let natqyearData = [];
    natqhistory = history.data.naqtquestionHistory;
    let natqData = [natqweekData, natqmonthData, natqyearData];
    let naqtlabels = [ 'History', 'Geography', 'Fine Arts', 'Science', 'Literature', 'Myth/Philo/Relig', 'Social/Curr Events', 'Trash'];
    for(var i = 0; i< naqtlabels.length; i += 1){
        for(var j = 0; j< natqData.length; j +=1){
            natqData[j].push( (((natqhistory.filter((item)=> item.catagory === `${naqtlabels[i]}` && item.correct === true && d.getTime() - item.timestamp < timeArr[j]).length) / natqhistory.filter((item)=> item.catagory === `${naqtlabels[i]}` && d.getTime() - item.timestamp < timeArr[j]).length)* 100).toFixed(2));
        }
    }
    const data = {
        labels: naqtlabels,
        datasets:[{
            label : '7 Days',
            data: natqweekData,
            fill: true,
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgb(255, 0, 0)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
            label: '30 Days',
            data: natqmonthData,
            hidden: true,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
        }, {
            label: '365 Days',
            data: natqyearData,
            hidden: true,
        fill: true,
        backgroundColor: 'rgba(54, 235, 54, 0.2)',
        borderColor: 'rgb(54, 235, 54)',
        pointBackgroundColor: 'rgb(54, 235, 54)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 235, 54)'
        }
    
    ]
    }
    return data;
    
 }

 function kmChart(history){
    let weekData = [];
    let monthData = [];
    let yearData = [];
    let kmData = [weekData, monthData, yearData];
    let kmLabels = ['History','Geography','Math','Science','Grammer','Lit','Other']; 
    let kmHistory = history.data.questionHistory;
    for(var i = 0; i< kmLabels.length; i += 1){
        for(var j = 0; j< kmData.length; j +=1){
            kmData[j].push( (((kmHistory.filter((item)=> item.catagory === `${kmLabels[i]}` && item.correct === true && d.getTime() - item.timestamp < timeArr[j]).length) / kmHistory.filter((item)=> item.catagory === `${kmLabels[i]}` && d.getTime() - item.timestamp < timeArr[j]).length)* 100).toFixed(2));
        }
    }
    const data = {
        labels: kmLabels,
        datasets:[{
            label : '7 Days',
            data: weekData,
            fill: true,
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgb(255, 0, 0)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
            label: '30 Days',
            data: monthData,
            hidden: true,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
        }, {
            label: '365 Days',
            data: yearData,
            hidden: true,
        fill: true,
        backgroundColor: 'rgba(54, 235, 54, 0.2)',
        borderColor: 'rgb(54, 235, 54)',
        pointBackgroundColor: 'rgb(54, 235, 54)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 235, 54)'
        }
    
    ]
    }

    return data;
    
    

 }


 function renderChart(ctx, data , username, km){
    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `${username}'s ${km} stats`
                }
            },
            transitions: {
                show:{
                    animations:{
                        r:{
                            from: 0
                        } 
                    }
                },
                hide:{
                    animations:{
                        r:{
                            to: 0
                        }
                    }
                }
            },  
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    scaleFontSize: 10,
                }
            },
            responsive: false,
          elements: {
            line: {
              borderWidth: 3
            }
          }
        },
    
});



 }


