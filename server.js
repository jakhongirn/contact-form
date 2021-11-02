const express = require('express');

const app = express();
const log = console.log;
const path = require('path');
const PORT = 8080;



app.listen(PORT, function() {
    log("Server is running on port 8080...")
})