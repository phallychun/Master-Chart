
// MAIN CODE =================================================================

let fs = require('fs');
const express = require("express");
const { response, request } = require('express');
const app = express();
const port = 3000;


// Array to store the user account that can access to conversation
let containUser = [
  {username:'phally',password:"12345",phone:"0964768102"},
  {username:'ronan',password:"12345",phone:"0964768102"},
];


// Add listen proccess port
app.listen(process.env.PORT|| port, () => console.log("Server running..."));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

let dataMessage = JSON.parse(fs.readFileSync('dataMessage.json'));

// CONTAIN REQUEST DATA FROM CONVERSATION MESSAGE=====================================
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

  console.log("hw",dataMessage);
});

app.get('/conversation',(request, response)=>{
  response.send(dataMessage);
})

//UPDAT DATA FROM EDIT MESSAGES INTO DATAMSESSAGE.JSON FILE=========================================================

app.put('/conversation',(request, response)=>{
  let messageId = request.body.messageId;
  let newText = request.body.messageText;
  // 1- update message
  dataMessage[messageId].message = newText;
  // 2 save
  fs.writeFileSync('dataMessage.json',JSON.stringify(dataMessage));
  // 3 end the list
  response.send(dataMessage);

  console.log('updating message of id' , messageId, ' with next text', newText);
})


// REMOVE MESSAGE ON JSON FILE=================================================================================
app.delete('/conversation',(request,response)=>{
   let idRemove = request.body.removeId;
   console.log('before', dataMessage);
  dataMessage.splice(idRemove,1);
  console.log('after', dataMessage);
  fs.writeFileSync('dataMessage.json',JSON.stringify(dataMessage));

  response.send(dataMessage);
})


// CONTAIN REQUEST DATA FROM LOGIN USER ACCOUNT===================================================================

app.get("/login",(request, response) => {
  response.send(containUser);
});




