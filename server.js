
// MAIN CODE =================================================================

let fs = require('fs');
const express = require("express");
const { response } = require('express');
const app = express();
const port = 3000;


// ARRAY TO STORE THE INFORMATION OF THE APP=====================================
// Array to store the message of conversation 
let dataMessage = [];

// Array to store the user account that can access to conversation
let containUser = [
  {username:'phally',password:"12345",phone:"0964768102"},
  {username:'ronan',password:"12345",phone:"0964768102"},
  {username:'phearak',password:"12345",phone:"0964768102"},
  {username:'rady',password:"12345",phone:"0964768102"}
];

// Add listen proccess port
app.listen(process.env.PORT|| port, () => console.log("Server running..."));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

// CONTAIN REQUEST DATA FROM CONVERSATION MESSAGE=====================================
app.post("/conversation", (request, response) => {
  let message  = request.body;
  dataMessage.push(message);
  response.send(dataMessage);

  console.log("hw",dataMessage);
});

app.get('/conversation',(request, response)=>{
  response.send(dataMessage);

  // console.log(dataMessage);
  
})

// CONTAIN REQUEST DATA FROM LOGIN USER ACCOUNT================================================

app.get("/login",(request, response) => {
  response.send(containUser);
  console.log(containUser)
});

