const express = require('express');
const bodyParser = require("body-parser");
const sendMail = require('./mail');

const app = express();
const path = require('path');
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/email', (req, res) => {
    // res.sendFile(path.join(__dirname + '/contact-us.html'));
    //TODO
    //send email here
    const name = req.body.name
    const number = req.body.number;
    const Data = {
        "Client's name": name,
        "Client's number": number
    }
    console.log(Data);

    sendMail(name, number, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.status({ message: 'Email sent!!!' });
        }
    });
    // res.json({ message: 'Message received!!!' })
});


app.listen(PORT, function() {
    console.log("Server is running on port 8080...")
})