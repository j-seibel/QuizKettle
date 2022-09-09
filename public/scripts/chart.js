

// This file holds the setup for displaying the chart on the stats page
let user;
let history;


const day = 24 * 60 * 60 * 1000;
const week = 7 * day;
const month = 30 * day;
const year = 365 *day;
let timeArr = [week,month,year];
const d = new Date();


wrapper();


async function wrapper(){
   

    await resumeSession();
    history = await axios.post('./stats/history', {
        username: user.username
    });
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const ctx = document.getElementById('myChart').getContext('2d');
    let data2 = naqtChart(history);
    let data = kmChart(history);

    const myChart2 = new Chart(ctx2, {
        type: 'radar',
        data: data2,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'NAQT Stats'
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
                    suggestedMax: 100
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

    const myChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Knowelage Master Stats'
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
                    suggestedMax: 100
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
    let naqtlabels = [ 'History', 'Geography', 'Fine Arts', 'Science', 'Literature', 'Mythology/Philosophy/Religion', 'Social Studies / Current Events', 'Trash'];
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

 