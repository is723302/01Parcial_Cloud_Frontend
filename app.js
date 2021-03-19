const express = require('express')
const path = require('path');
const app = express();
const fetch = require('node-fetch');
require("dotenv").config();

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "0.0.0.0"

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

// POST method route
app.post('/', function (req, res) {
  // Text to pass to API
  const text = req.body.text
  let data = {text: text};

  fetch(process.env.CloudFoundryServiceUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{ 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        console.log('Success:', response)
    });

})

app.listen(PORT,HOST, () => { 
    console.log(`Server listening on port ${PORT} and host ${HOST}`); 
})