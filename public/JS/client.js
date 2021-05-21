
// Varaible store Ip address and port ================================================================================================

const IP = 'http://192.168.88.30:';
const PORT = 3000;
const url_conversation = IP + PORT + '/conversation';
const url_login = IP + PORT +'/login';

// ALL FUNCTION OF CONTAIN MESSAGE =========================================================================
// Function for Send the massages================================================================================================
function sendMessage(event){
    event.preventDefault();
    let datas = {name: user, message: message_text.value};

    axios.post(url_conversation,datas)
    .then((response)=>{
        displayData(response.data);
    });
}

// Function for diplay the data==============================================================================================================

function displayData(messages){
  
    let contain_message_user = document.querySelector('.contain-user-message-right');
    if(contain_message_user !== null){
        contain_message_user.remove();
        
    };
    contain_message_user = document.createElement('div');
    contain_message_user.className = 'contain-user-message-right';

    for(let item of messages){
        let user_profile = document.createElement('span');
        user_profile.className = 'user-profile';
        user_profile.textContent = item.name;
        
        let messageTage = document.createElement('span');
        messageTage.className = 'sms';
        messageTage.textContent = item.message;

        contain_message_user.appendChild(messageTage);
        contain_message_user.appendChild(user_profile);

        contain_message.appendChild(contain_message_user);
    }
}

// Function load Data from Server ===========================================================================================================

function loadData(){
    axios.get(url_conversation)
    .then((response)=>{
        displayData(response.data);
    });
}


// ALL FUNCTION LOGIN ACCOUNT ======================================================================

// Function for login 
function loginAccount(event){
    event.preventDefault();
    loadLogin();

}
// Function display information login
function displayLogin(userAccount){
    let text = 'Lgin Failed! Please try again';
    let text_color = 'red';
    let login_fount = false;

    for(let user of userAccount){
        if(user === userAccount.username && user === userAccount.password && user === userAccount.phone){
           login_fount = true;
        }
    }
    if(login_fount){
        
        contain_conversation.style.display = 'block';
    }else{
        display_info.textContent = text;
        display_info.style.color = text_color;
    }
    
}
// Function load login data
function loadLogin(){
    axios.get(url_login)
    .then((response)=>{
        displayLogin(response.data);
    });
}
// GET VALUE FROM DOM====================================================

let contain_conversation = document.querySelector('#chat-container');
let message_text = document.querySelector('#text');
let user = document.querySelector('.img-profile').textContent;
let contain_message = document.querySelector('#chat-message-list');

let login_container = document.querySelector('.login-container');
let username_loging = document.querySelector('.UserName');
let password = document.querySelector('.password');
let number_phone = document.querySelector('.number');
let display_info = document.querySelector('.information');

// ADD EVETNLISTENTER BUTTON
let sendButton = document.getElementById('sentButton');
sendButton.addEventListener('click',sendMessage);

let loginButton = document.querySelector('.login');
loginButton.addEventListener('click',loginAccount);

// call load funcion =====================================================================================================================

loadData();

loadLogin();