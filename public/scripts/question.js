const form = document.getElementById("loginForm");




$(form).submit(async (e)=>{
    e.preventDefault();
    $('.error').text("");
   
    let test = $(form).serializeArray();

    $(':input',form)
  .not(':button, :submit, :reset, :hidden')
  .val('')
    

   await axios.post("/question", 
        {   question: test[0].value,
            answer: test[1].value,
            catagory: test[2].value,
            
        })
    
    
})