
// Varaible store Ip address and port ================================================================================================

const IP = 'http://192.168.88.25:';
const PORT = 3000;
const url_conversation = IP + PORT + '/conversation';
const url_login =  IP + PORT + '/login';


// ALL FUNCTION OF CONTAIN MESSAGE =========================================================================
// Function for Send the massages================================================================================================

function sendMessage(event){
    event.preventDefault();
    // Get data from /login user
    let datas = {name:users, message: message_text.value};
    console.log(datas)

    axios.post(url_conversation,datas)
    .then((response)=>{
        displayData(response.data);
    });
}

// Function for diplay the data==============================================================================================================

function displayData(messages){
    console.log(messages)
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

// GET DATA LOGIN USER FROM LOCALSTORAGE=========================================================
let Item_user = JSON.parse(localStorage.getItem('user'));

// LOOP FOR GET HTE USERNAME TO DISPLAY ON THE TITLE USER
let users = '';
for(let item of Item_user){
    users = item.username;
}


// GET VALUE FROM DOM====================================================

let contain_conversation = document.querySelector('#chat-container');
let message_text = document.querySelector('#text');
let contain_message = document.querySelector('#chat-message-list');

let name_of_user = document.querySelector('#username');
name_of_user.textContent = users;

let user_profile = document.querySelector('.img-profile');
user_profile.textContent = users[0];


// ADD EVETNLISTENTER BUTTON
let sendButton = document.getElementById('sentButton');
sendButton.addEventListener('click',sendMessage);

// call load funcion =====================================================================================================================

loadData();
setInterval(loadData, 500);
