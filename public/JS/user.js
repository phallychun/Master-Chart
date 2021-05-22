

// MAIN CODE=======================================================================================
const IP = 'http://192.168.88.30:';
const PORT = 3000;
const url_login = IP + PORT +'/login';

// ALL FUNCTION LOGIN ACCOUNT ======================================================================
function loginAccount(event){
    event.preventDefault();
    loadLogin();

}
// FUNCTION TO DISPLAY INFORMATION FROM LOGIN USER===========================================================================
function displayLogin(userAccount){
    
    let text_color = 'red';
    let text = 'Lgin Failed! Please try again';
    let login_fount = false;
    for(let user of userAccount){
       
        if(user.username === userAccount.username && user.password === userAccount.password && user.phone === userAccount.phone){
           login_fount = true;
           console.log("successfuly")
        }
    }
    if(login_fount){
        window.location.pathname = "../conversation.html";
    }else{
        display_info.textContent = text;
        display_info.style.color = text_color;
    }
    
}
// FUNCTION TO LOAD LOGIN DATA FROM THE SERVER================================================================================
function loadLogin(){
    axios.get(url_login)
    .then((response)=>{
        displayLogin(response.data);
    });
}


// GOT VALUE FROM DOM ==================================================================================
let login_container = document.querySelector('.login-container');
let username_loging = document.querySelector('.UserName');
console.log(username_loging.value);
let password = document.querySelector('.password');
let number_phone = document.querySelector('.number');
let display_info = document.querySelector('.information');


// CALL FUNCTION TO ADD EVENTLISTENNER ========================================================================

let loginButton = document.querySelector('.login');
loginButton.addEventListener('click',loginAccount);

loadLogin();
