

// MAIN CODE==============================================================================================================
const IP = 'https://phally-master-app.herokuapp.com/';
// const PORT = 3000;
const url_login = IP +'/login';

// FUNCTION LOGIN ACCOUNT  ==============================================================================================
function loginAccount(event){
    event.preventDefault();
    loadLogin();
}

// FUNCTION TO DISPLAY INFORMATION FROM LOGIN USER===========================================================================
function displayLogin(userAccount){
    
    // VARAIBLE TO STORE SOMETHING OF USER LOGIN =============================================================================
    let text_color = 'red';
    let text = 'Lgin Failed! Please try again';
    let login_fount = false;

    // LOOP FOR CHECK THE THE RESULT AND RETURE BOOLEAN ================================================================
    for(let user of userAccount){
        if(user.username === username_loging.value && user.password === password.value && user.phone === number_phone.value){
            login_fount = true;

            // CHECK CONDITION FOR SET THE COLORS TO SPICIFECT USER LOGIN============================================
            let color = '';
            if(username_loging.value === 'ronan'){
                color = '#c42121';
            }else if(username_loging.value === 'phally'){
                color = '#1fc309';
            };

            // CREATE OBJECT TO STORE THE INFORMATION OF USER LOGIN================================================
            let objectData = {
                username : username_loging.value, 
                password : password.value, 
                phone :  number_phone.value,
                color: color,
            };
            
            // PUSH OBJECTDATA INTO DATAUSER LOGING ===============================================================
            DataUser.push(objectData);
            
            // SET DATA USER LOGIN TO LOCALSTORAGE===============================================================
            localStorage.setItem('user',JSON.stringify(DataUser));
        } 
    }   
    
    // CHECK USER LOGIN FOUND OR NOT FOUND AS THE SAME USER IN SERVER==========================================================================
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

// GOT VALUE FROM DOM ==================================================================================
let login_container = document.querySelector('.login-container');
let username_loging = document.querySelector('.UserName');
let password = document.querySelector('.password');
let number_phone = document.querySelector('.number');
let display_info = document.querySelector('.information');

// CALL FUNCTION TO ADD EVENTLISTENNER ========================================================================
let loginButton = document.querySelector('.login');
loginButton.addEventListener('click',loginAccount);


