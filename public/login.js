

const form = document.getElementById("loginForm");



$(form).submit(async (e)=>{
    e.preventDefault();
    let test = $(form).serializeArray();
        const succ = await axios.post("/login", 
        {   email: test[0].value,
            password: test[1].value,
        })
        if(succ.data){
        location.href = "."
        }else{
            document.getElementById('passwordError').innerHTML = "Email and Password do not match";
        }
    
})