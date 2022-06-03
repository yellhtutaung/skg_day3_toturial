const express = require('express');
const { serverPort } = require('./config');

const app = express();
app.listen(serverPort,()=>{
    console.log(`Server is running at port ${serverPort}`)
})