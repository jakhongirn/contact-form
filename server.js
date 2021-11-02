const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const path = require('path');
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/email', (req, res) => {
    //Send an email here but currently dummy email
    console.log("name :", req.body.name);
    console.log("number: ", req.body.number);
    
});


app.listen(PORT, function() {
    console.log("Server is running on port 8080...")
})