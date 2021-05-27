
// MAIN VARAIBLE TO STORE THE URL FROM SERVER ================================================================================================

const IP = 'http://192.168.88.20:';
const PORT = 3000;
const url_conversation = IP + PORT + '/conversation';
const url_login =  IP + PORT + '/login';



// ALL FUNCTION OF CONTAIN MESSAGE ==============================================================================================
// Function for Send the massages Or Edit Messages================================================================================================

function sendMessage(event){
    event.preventDefault();
   
//  CHECK CONDICTION FOUNDCHANGE OR NOT FOUNDCHANGE IF FOUNDCHANGE USER EDIT IF NOT FOUNDCHANGE USER ADD MESSAGES================
    if(foundChange){
        let body  = {messageId: editMessageId, messageText : message_text.value };
        axios.put(url_conversation,body).then((response)=>{
            displayMessage(response.data);
        });
        message_text.value = '';
        foundChange = false;
    }
    else{
        datas = {
            name:users, 
            message: message_text.value, 
            messagecolor : color,
            italic:fountItalic,
            bold:fountBold,
        };
        axios.post(url_conversation,datas)
        .then((response)=>{
            displayMessage(response.data);
        });
        message_text.value ='';
    }
}

// FUNCTION FOR DISPLAY THE MESSAGE===========================================================================================

let foundChange = false;
let editMessageId = -1;
let IdRemove = -1;
function displayMessage(messages){
    if(contain_message_user !== null){
        contain_message_user.remove();
    };

    // CREATE NEW DIV TO DISPLAY THE MESSAGES ON THE BODY OF MESSAGES LIST============================================================
    contain_message_user = document.createElement('div');
    contain_message_user.className = 'contain-user-message-right';
    contain_message.appendChild(contain_message_user);

    // LOOP FOR CREATE THE CONTAIN TEXT MESSAGES AND GET VALUE FROM LOAD MESSAGE TO DISPLAY THE MESSAGES==========================
    for(let item of messages){
        if(item.message !== ''){
            
            let user_profile = document.createElement('span');
            user_profile.className = 'user-profile';
            user_profile.textContent = item.name;
            
            let contain_SMS = document.createElement('span');
            contain_SMS.className = 'sms';
            let messageTage = document.createElement('p');
            messageTage.className = 'text';
            messageTage.id = item.id;

            messageTage.style.display = 'flex';
            messageTage.style.alignItems = 'center';
           
            messageTage.textContent = item.message;
            messageTage.style.margin = '10px';

            // SET BACKGROUND COLOR TO MESSAGAE=====================================================================
            contain_SMS.style.background = item.messagecolor;

           // CHECK ITALIC STYLE FOUNT OR NOT AND SET THE STYLE OF MESSAGES========================================
            if(item.italic === true){
                messageTage.style.fontStyle="normal";
            }
            else{
                messageTage.style.fontStyle="italic";
            }
            
            // CHECK BOLD STYLE FONT OR NOT AND SET HTE STYLE OF MESSAGES=====================================
            if(item.bold === true){
                messageTage.style.fontWeight="normal";
            }
            else{
                messageTage.style.fontWeight="bold";
            }

            // EDITE FEATURE=========================================================================================
            let edite = document.createElement('i');
            edite.className = "fa fa-pencil-square-o";
            edite.ariaHidden = 'true';
            edite.id = 'edit';
           
            edite.addEventListener('click',()=>{
                foundChange = true;
                let change = messageTage.textContent;
                message_text.value = change;
                editMessageId = edite.parentElement.id;
                
            })

            // QUOTE FEATURE==========================================================================================
            let quote = document.createElement('i');
            quote.className = 'fa fa-quote-right';
            quote.ariaHidden = 'true';
            quote.id = 'quote';

            // REMOVE FEATURE=========================================================================================
            let remove = document.createElement('i');
            remove.className = "fa fa-trash";
            remove.ariaHidden = 'true';
            remove.id = 'remove';
            remove.addEventListener('click',()=>{
                IdRemove = remove.parentElement.id;
                let newData = {removeId :IdRemove};
                axios.delete(url_conversation,newData).then( res => {
                    console.log("hello ",IdRemove);
                })
            })
                    
            // CREATE MOUSEOVER AND MOUSEOUT==========================================================================
            contain_SMS.addEventListener("mouseover",()=>{
                edite.style.display = 'block';
                quote.style.display = 'block';
                remove.style.display = 'block';
            });
            contain_SMS.addEventListener('mouseout',()=>{
                edite.style.display = 'none';
                quote.style.display = 'none';
                remove.style.display = 'none';
            })

            // CREATE HTE NEW DIV TO CONTAIN THE MESSAGE AND USRENAME==================================================
            let messageDiv = document.createElement('div');
            messageDiv.className = 'message-div';
            
            // APPEND THE OPTION INTO MESSAGETAGE AND APPEND EDITE AND QUOTE INTO OPTION================================================================
            messageTage.appendChild(edite);
            messageTage.appendChild(quote);
            messageTage.appendChild(remove);
            contain_SMS.appendChild(messageTage);
            
            // APPEND THE MESSAGETAGE INTO NEW DIV==========================================================================
            
            messageDiv.appendChild(contain_SMS);
            messageDiv.appendChild(user_profile);

            // APPEND NEW DIV INTO CONTAIN ALL MESSAGES====================================================================
            contain_message_user.appendChild(messageDiv);

            

        }

    }
}


// FUNCTION LOAD DATA MESSAGE FROM SERVER ===========================================================================================================

function loadMessage(){
    axios.get(url_conversation)
    .then((response)=>{
        displayMessage( response.data);
    });
}

// GET DATA LOGIN USER FROM LOCALSTORAGE TO DISPLAY ON DOM TITLE==========================================================================
let Item_user = JSON.parse(localStorage.getItem('user'));
// console.log(Item_user);

// LOOP FOR GET HTE USERNAME TO DISPLAY ON THE TITLE USER==========================================================
let users = '';
let color = '';
for(let item of Item_user){
    users = item.username;
    color = item.color;
    // console.log(color);
}


// SEARCH FEATURE SMILEYS EMOJI AND STORE INTO INPUT MESSAGE TAGE=======================================================
const Emoji = document.querySelector(".smiles");    
const picker = new EmojiButton();
document.addEventListener('DOMContentLoaded', () =>{
    picker.on('emoji', emoji =>{
        message_text.value += emoji;
    });
    
    Emoji.addEventListener('click', () => {
        picker.togglePicker(Emoji);
    });
});




// SET BACKGROUND COLOR TO BODY BY USER CLICK CHANGE======================================================================================



// ADD THE CUSTOM STYLE INTO THE INPUT MESSAGES============================================================================
// Text italic check true or false to reture the italic style
let costomsItalic = document.querySelector('.italic-style');
let countItalic = 0;
let fountItalic = true;
costomsItalic.addEventListener('click',()=>{
    message_text.style.fontStyle="italic";
    countItalic += 1;
    if(countItalic %2 === 0){
        message_text.style.fontStyle="normal";
        fountItalic = true;
    }else{
        fountItalic = false;
    }
});

// Text bold check true or false to return the bold style
let costomBold = document.querySelector('.bold-style');
let countBold = 0;
let fountBold = true;
costomBold.addEventListener('click',()=>{
    message_text.style.fontWeight="bold";
    countBold += 1;
    if(countBold%2 === 0){
        message_text.style.fontWeight="normal";
        fountBold = true;
    }else{
        fountBold = false;
    }
});


// GET VALUE FROM DOM===========================================================================================


let contain_message_user = document.querySelector('.contain-user-message-right');

let contain_conversation = document.querySelector('#chat-container');
let message_text = document.querySelector('#text');
let contain_message = document.querySelector('#chat-message-list');
let colors = document.querySelector('#colors');

let name_of_user = document.querySelector('#username');
name_of_user.textContent = users;

let user_profile = document.querySelector('.img-profile');
user_profile.textContent = users[0];



// ADD EVETNLISTENTER BUTTON
let sendButton = document.getElementById('sentButton');
sendButton.addEventListener('click',sendMessage);

// call load funcion =====================================================================================================================

loadMessage();
setInterval(loadMessage,500);


// chat_box.scrollTop = chat_box.scrollHeight - chat_box.clientHeight;