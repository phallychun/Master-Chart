
// Varaible store Ip address and port ================================================================================================

const IP = 'http://192.168.88.30:';
const PORT = 3000;
const url_conversation = IP + PORT + '/conversation';


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

// GET VALUE FROM DOM====================================================

let contain_conversation = document.querySelector('#chat-container');
let message_text = document.querySelector('#text');
let user = document.querySelector('.img-profile').textContent;
let contain_message = document.querySelector('#chat-message-list');


// ADD EVETNLISTENTER BUTTON
let sendButton = document.getElementById('sentButton');
sendButton.addEventListener('click',sendMessage);

// call load funcion =====================================================================================================================

loadData();

