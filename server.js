
// MAIN CODE =================================================================

let fs = require('fs');
const express = require("express");
const { response } = require('express');
const app = express();
const port = 3000;


// ARRAY TO STORE THE INFORMATION OF THE APP=====================================
let dataMessage = [];

let containUser = [
  {username:'phally',password:12345,phone:0964768102},
  {username:'ronan',password:12345,phone:0964768102},
  {username:'phearak',password:12345,phone:0964768102},
  {username:'rady',password:12345,phone:0964768102}
];


app.listen(process.env.PORT|| port, () => console.log("Server running..."));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

// CONTAIN REQUEST DATA FROM CONVERSATION MESSAGE=====================================
app.post("/conversation", (request, response) => {
  let message  = request.body;
  dataMessage.push(message);
  response.send(dataMessage);
});

app.get('/conversation',(request, response)=>{
  response.send(dataMessage);
})

// CONTAIN REQUEST DATA FROM LOGIN USER ACCOUNT================================================

app.get("/login", (request, response) => {
  response.send(containUser);
});
