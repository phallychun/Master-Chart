

// MAIN CODE=======================================================================================
const IP = 'http://192.168.88.24:';
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
        if(user.username === username_loging.value && user.password === password.value && user.phone === number_phone.value){
            login_fount = true;
            console.log('success');

            let objectData = {username : username_loging.value, password : password.value, phone :  number_phone.value};
            DataUser.push(objectData);
            console.log(DataUser);

            localStorage.setItem('user',JSON.stringify(DataUser));

        } 
    }   
    if(login_fount){
        window.location.pathname = "../conversation.html";
    }
    else{
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

//ARRAY TO STORE THE DATA FROM INPUT
let DataUser = [];

// // SET DATA FROM DOM TO LOCALSTORAGE =================================================================================


// GOT VALUE FROM DOM ==================================================================================
let login_container = document.querySelector('.login-container');
let username_loging = document.querySelector('.UserName');
let password = document.querySelector('.password');
let number_phone = document.querySelector('.number');
let display_info = document.querySelector('.information');


// CALL FUNCTION TO ADD EVENTLISTENNER ========================================================================

let loginButton = document.querySelector('.login');
loginButton.addEventListener('click',loginAccount);


