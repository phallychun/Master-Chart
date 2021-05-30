
// MAIN CODE =================================================================

let fs = require('fs');
const express = require("express");
const app = express();
const port = 3000;

// ARRAY TO STORE THE USER ACCOUNT THAT CAN ACCESS TO CONVERSATION =====================================================
let containUser = [
  {username:'phally',password:"12345",phone:"0964768102"},
  {username:'ronan',password:"12345",phone:"0964768102"},
];


// ADD LISTEN PROCESS PORT SERVER====================================================================================
app.listen(process.env.PORT|| port, () => console.log("Server running..."));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

let dataMessage = JSON.parse(fs.readFileSync('dataMessage.json'));

// CONTAIN REQUEST DATA FROM CONVERSATION MESSAGE CLIENT==========================================================
app.post("/conversation", (request, response) => {
  let containMessage = {
    id : dataMessage.length,
    name : request.body.name,
    message : request.body.message,
    messagecolor : request.body.messagecolor,
    italic : request.body.italic,
    bold : request.body.bold
  }
  dataMessage.push(containMessage);
  fs.writeFileSync('dataMessage.json',JSON.stringify(dataMessage));
  response.send(dataMessage);
});

// SEND THE DATA OF MESSAGE TO CLIENT ===============================================================================
app.get('/conversation',(request, response)=>{
  response.send(dataMessage);
})

//UPDAT DATA FROM EDIT MESSAGES INTO DATAMSESSAGE.JSON FILE=========================================================
let indexEdit = -1;
app.put('/conversation',(request, response)=>{
  let messageId = parseInt(request.body.messageId);
  let newText = request.body.messageText;
  // 1- update message
  for(let sms of dataMessage){
    indexEdit ++;
    console.log(indexEdit, sms.id);
    if(messageId === sms.id){
      dataMessage[indexEdit].message = newText;
    }
  }
  // 2 save
  fs.writeFileSync('dataMessage.json',JSON.stringify(dataMessage));
  // 3 end the list
  response.send(dataMessage);
})

// REMOVE MESSAGE ON JSON FILE=================================================================================
let indexRemove = -1
app.delete('/conversation/:idDelete',(req,res)=>{
  let idRemove = parseInt(req.params.idDelete);
  for(let item of dataMessage){
    indexRemove ++;
    if(idRemove === item.id){
      dataMessage.splice(indexRemove,1);
    }
  }
  fs.writeFileSync('dataMessage.json',JSON.stringify(dataMessage));
  res.send(dataMessage);
})

// CONTAIN REQUEST DATA FROM LOGIN USER ACCOUNT===================================================================
app.get("/login",(request, response) => {
  response.send(containUser);
});




