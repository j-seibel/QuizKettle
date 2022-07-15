

const ctx2 = document.getElementById('myChart2').getContext('2d');
const ctx = document.getElementById('myChart').getContext('2d');
let user;
let history;
let weekData = [];
let monthData = [];
let yearData = [];
let natqhistory;
let natqweekData = [];
let natqmonthData = [];
let natqyearData = [];
const day = 24 * 60 * 60 * 1000;
const week = 7 * day;
const month = 30 * day;
const year = 365 *day;
const d = new Date();


wrapper();


async function wrapper(){
    await resumeSession();
    history = await axios.post('./stats/history', {
        username: user.username
    });
    natqhistory = history.data.naqtquestionHistory;
    console.log(natqhistory);
    history = history.data.questionHistory;
    const now = performance.now();
    weekData.push( (((history.filter((item)=> item.catagory === 'History' && item.correct === true && d.getTime() - item.timestamp < week).length) / history.filter((item)=> item.catagory === 'History' && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    weekData.push( (((history.filter((item)=> item.catagory === 'Geography' && item.correct === true && d.getTime() - item.timestamp < week).length) / history.filter((item)=> item.catagory === 'Geography' && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    weekData.push( (((history.filter((item)=> item.catagory === 'Math' && item.correct === true && d.getTime() - item.timestamp < week).length) / history.filter((item)=> item.catagory === 'Math' && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    weekData.push( (((history.filter((item)=> item.catagory === 'Science' && item.correct === true && d.getTime() - item.timestamp < week).length) / history.filter((item)=> item.catagory === 'Science' && d.getTime() - item.timestamp < week).length) * 100).toFixed(2));
    weekData.push( (((history.filter((item)=> item.catagory === 'Grammer' && item.correct === true && d.getTime() - item.timestamp < week).length) / history.filter((item)=> item.catagory ==='Grammer' && d.getTime() - item.timestamp < week).length) * 100).toFixed(2));
    weekData.push( (((history.filter((item)=> item.catagory === 'Lit' && item.correct === true && d.getTime() - item.timestamp < week).length) / history.filter((item)=> item.catagory === 'Lit' && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    weekData.push( (((history.filter((item)=> item.catagory === 'Other' && item.correct === true && d.getTime() - item.timestamp < week).length) / history.filter((item)=> item.catagory === 'Other' && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    monthData.push( (((history.filter((item)=> item.catagory === 'History' && item.correct === true && d.getTime() - item.timestamp < month).length) / history.filter((item)=> item.catagory === 'History' && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    monthData.push( (((history.filter((item)=> item.catagory === 'Geography' && item.correct === true && d.getTime() - item.timestamp < month).length) / history.filter((item)=> item.catagory === 'Geography' && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    monthData.push( (((history.filter((item)=> item.catagory === 'Math' && item.correct === true && d.getTime() - item.timestamp < month).length) / history.filter((item)=> item.catagory === 'Math' && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    monthData.push( (((history.filter((item)=> item.catagory === 'Science' && item.correct === true && d.getTime() - item.timestamp < month).length) / history.filter((item)=> item.catagory === 'Science' && d.getTime() - item.timestamp < month).length) * 100).toFixed(2));
    monthData.push( (((history.filter((item)=> item.catagory === 'Grammer' && item.correct === true && d.getTime() - item.timestamp < month).length) / history.filter((item)=> item.catagory ==='Grammer' && d.getTime() - item.timestamp < month).length) * 100).toFixed(2));
    monthData.push( (((history.filter((item)=> item.catagory === 'Lit' && item.correct === true && d.getTime() - item.timestamp < month).length) / history.filter((item)=> item.catagory === 'Lit' && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    monthData.push( (((history.filter((item)=> item.catagory === 'Other' && item.correct === true && d.getTime() - item.timestamp < month).length) / history.filter((item)=> item.catagory === 'Other' && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    yearData.push( (((history.filter((item)=> item.catagory === 'History' && item.correct === true && d.getTime() - item.timestamp < year).length) / history.filter((item)=> item.catagory === 'History' && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    yearData.push( (((history.filter((item)=> item.catagory === 'Geography' && item.correct === true && d.getTime() - item.timestamp < year).length) / history.filter((item)=> item.catagory === 'Geography' && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    yearData.push( (((history.filter((item)=> item.catagory === 'Math' && item.correct === true && d.getTime() - item.timestamp < year).length) / history.filter((item)=> item.catagory === 'Math' && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    yearData.push( (((history.filter((item)=> item.catagory === 'Science' && item.correct === true && d.getTime() - item.timestamp < year).length) / history.filter((item)=> item.catagory === 'Science' && d.getTime() - item.timestamp < year).length) * 100).toFixed(2));
    yearData.push( (((history.filter((item)=> item.catagory === 'Grammer' && item.correct === true && d.getTime() - item.timestamp < year).length) / history.filter((item)=> item.catagory ==='Grammer' && d.getTime() - item.timestamp < year).length) * 100).toFixed(2));
    yearData.push( (((history.filter((item)=> item.catagory === 'Lit' && item.correct === true && d.getTime() - item.timestamp < year).length) / history.filter((item)=> item.catagory === 'Lit' && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    yearData.push( (((history.filter((item)=> item.catagory === 'Other' && item.correct === true && d.getTime() - item.timestamp < year).length) / history.filter((item)=> item.catagory === 'Other' && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    
    natqweekData.push( (((natqhistory.filter((item)=> item.catagory === 'History' && item.correct === true && d.getTime() - item.timestamp < week).length) / natqhistory.filter((item)=> item.catagory === 'History' && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    natqweekData.push( (((natqhistory.filter((item)=> item.catagory === 'Geography' && item.correct === true && d.getTime() - item.timestamp < week).length) / natqhistory.filter((item)=> item.catagory === 'Geography' && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    natqweekData.push( (((natqhistory.filter((item)=> item.catagory === 'Fine Arts' && item.correct === true && d.getTime() - item.timestamp < week).length) / natqhistory.filter((item)=> item.catagory === 'Fine Arts' && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    natqweekData.push( (((natqhistory.filter((item)=> item.catagory === 'Science' && item.correct === true && d.getTime() - item.timestamp < week).length) / natqhistory.filter((item)=> item.catagory === 'Science' && d.getTime() - item.timestamp < week).length) * 100).toFixed(2));
    natqweekData.push( (((natqhistory.filter((item)=> item.catagory === 'Literature' && item.correct === true && d.getTime() - item.timestamp < week).length) / natqhistory.filter((item)=> item.catagory === 'Literature' && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    natqweekData.push( (((natqhistory.filter((item)=> (item.catagory === 'Mythology' || item.catagory === 'Philosophy' || item.catagory === 'Religion') && item.correct === true && d.getTime() - item.timestamp < week).length) / natqhistory.filter((item)=> (item.catagory === 'Mythology' || item.catagory === 'Philosophy' || item.catagory === 'Religion') && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    natqweekData.push( (((natqhistory.filter((item)=> (item.catagory === 'Social Studies' || item.catagory === 'Current Events') && item.correct === true && d.getTime() - item.timestamp < week).length) / natqhistory.filter((item)=> (item.catagory === 'Social Studies' || item.catagory === "Current Events") && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    natqweekData.push( (((natqhistory.filter((item)=> item.catagory === 'Trash' && item.correct === true && d.getTime() - item.timestamp < week).length) / natqhistory.filter((item)=> item.catagory === 'Trash' && d.getTime() - item.timestamp < week).length)* 100).toFixed(2));
    natqmonthData.push( (((natqhistory.filter((item)=> item.catagory === 'History' && item.correct === true && d.getTime() - item.timestamp < month).length) / natqhistory.filter((item)=> item.catagory === 'History' && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    natqmonthData.push( (((natqhistory.filter((item)=> item.catagory === 'Geography' && item.correct === true && d.getTime() - item.timestamp < month).length) / natqhistory.filter((item)=> item.catagory === 'Geography' && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    natqmonthData.push( (((natqhistory.filter((item)=> item.catagory === 'Fine Arts' && item.correct === true && d.getTime() - item.timestamp < month).length) / natqhistory.filter((item)=> item.catagory === 'Fine Arts' && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    natqmonthData.push( (((natqhistory.filter((item)=> item.catagory === 'Science' && item.correct === true && d.getTime() - item.timestamp < month).length) / natqhistory.filter((item)=> item.catagory === 'Science' && d.getTime() - item.timestamp < month).length) * 100).toFixed(2));
    natqmonthData.push( (((natqhistory.filter((item)=> item.catagory === 'Literature' && item.correct === true && d.getTime() - item.timestamp < month).length) / natqhistory.filter((item)=> item.catagory === 'Literature' && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    natqmonthData.push( (((natqhistory.filter((item)=> (item.catagory === 'Mythology' || item.catagory === 'Philosophy' || item.catagory === 'Religion') && item.correct === true && d.getTime() - item.timestamp < month).length) / natqhistory.filter((item)=> (item.catagory === 'Mythology' || item.catagory === 'Philosophy' || item.catagory === 'Religion') && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    natqmonthData.push( (((natqhistory.filter((item)=> (item.catagory === 'Social Studies' || item.catagory === "Current Events") && item.correct === true && d.getTime() - item.timestamp < month).length) / natqhistory.filter((item)=> (item.catagory === 'Social Studies' || item.catagory === "Current Events") && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    natqmonthData.push( (((natqhistory.filter((item)=> item.catagory === 'Trash' && item.correct === true && d.getTime() - item.timestamp < month).length) / natqhistory.filter((item)=> item.catagory === 'Trash' && d.getTime() - item.timestamp < month).length)* 100).toFixed(2));
    natqyearData.push( (((natqhistory.filter((item)=> item.catagory === 'History' && item.correct === true && d.getTime() - item.timestamp < year).length) / natqhistory.filter((item)=> item.catagory === 'History' && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    natqyearData.push( (((natqhistory.filter((item)=> item.catagory === 'Geography' && item.correct === true && d.getTime() - item.timestamp < year).length) / natqhistory.filter((item)=> item.catagory === 'Geography' && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    natqyearData.push( (((natqhistory.filter((item)=> item.catagory === 'Fine Arts' && item.correct === true && d.getTime() - item.timestamp < year).length) / natqhistory.filter((item)=> item.catagory === 'Fine Arts' && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    natqyearData.push( (((natqhistory.filter((item)=> item.catagory === 'Science' && item.correct === true && d.getTime() - item.timestamp < year).length) / natqhistory.filter((item)=> item.catagory === 'Science' && d.getTime() - item.timestamp < year).length) * 100).toFixed(2));
    natqyearData.push( (((natqhistory.filter((item)=> item.catagory === 'Literature' && item.correct === true && d.getTime() - item.timestamp < year).length) / natqhistory.filter((item)=> item.catagory === 'Literature' && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    natqyearData.push( (((natqhistory.filter((item)=> (item.catagory === 'Mythology' || item.catagory === 'Philosophy' || item.catagory === 'Religion') && item.correct === true && d.getTime() - item.timestamp < year).length) / natqhistory.filter((item)=> (item.catagory === 'Mythology' || item.catagory === 'Philosophy' || item.catagory === 'Religion') && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    natqyearData.push( (((natqhistory.filter((item)=> (item.catagory === 'Social Studies' || item.catagory === "Current Events") && item.correct === true && d.getTime() - item.timestamp < year).length) / natqhistory.filter((item)=> (item.catagory === 'Social Studies' || item.catagory === "Current Events") && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    natqyearData.push( (((natqhistory.filter((item)=> item.catagory === 'Trash' && item.correct === true && d.getTime() - item.timestamp < year).length) / natqhistory.filter((item)=> item.catagory === 'Trash' && d.getTime() - item.timestamp < year).length)* 100).toFixed(2));
    

    const later = performance.now();
    
    const data = {
        labels: [
            'History',
            'Geography',
            'Fine Arts',
            'Science',
            'Lit',
            'Mythology/Philosophy/Religion',
            'Social Studies / Current Events',
            'Trash'
                ],
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
   
    const data2 = {
        labels: [
            'History',
            'Geography',
            'Math',
            'Science',
            'Grammer',
            'Lit',
            'Other'
                ],
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
                        text: 'Knowlage Master Stats'
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

 