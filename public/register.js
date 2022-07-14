const form = document.getElementById("loginForm");




$(form).submit(async (e)=>{
    e.preventDefault();
    $('.error').text("");
    let result;
   
    let test = $(form).serializeArray();
    

    
  
    if(test[3].value === test[2].value){
       result =  await axios.post("/login/register", 
        {   email: test[0].value,
            username: test[1].value,
            password: test[2].value,
            school: test[4].value
            
        })
    }else{
        $('#confirmError').append('Passwords do not match')
        return;
    }

    if(!result.data.error){
        location.href = '..';
    }

    if((result.data.error).indexOf("Email") > -1){
        $("#emailError").append( result.data.error);
    }else{
        $("#usernameError").append( result.data.error);

    }
    
})