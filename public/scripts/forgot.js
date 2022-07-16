var email = '';
const back = document.getElementById('back');
const form = document.getElementById('loginForm');
const msgDiv = document.getElementById('sent');
const msg = document.getElementById('msg');

back.addEventListener('click', (e)=>{
    form.style.display = 'flex';
    msgDiv.style.display = 'none'

})




$('#loginForm').submit(async (e)=>{
    e.preventDefault();
    email = $('#emailInput').val();
    $('#emailInput').val('');
    console.log(email);
    msg.textContent = `Email has been sent to ${email}! If you do not recive the email check in your spam folder and make sure the email is correct.`
    
    form.style.display = 'none';
    msgDiv.style.display = 'flex';
    const send = await axios.post("../login/email", 
        {   
            email: email,
        });
    

    


})