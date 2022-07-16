const form = document.getElementById("loginForm");




$(form).submit(async (e)=>{
    e.preventDefault();
    $('.error').text("");
    let result;
   
    let test = $(form).serializeArray();
    

    
  
    if(test[0].value === test[1].value){
        console.log('ajax');
       result =  await axios.post("/login/updatePassword", 
        {   
            password: test[0].value,
            token: clientToken,
            
        })
    }else{
        $('#confirmError').append('Passwords do not match')
        return;
    }

    if(result.data){
        console.log('reeeeeee');
        location.href = '/login';
    }

    
})