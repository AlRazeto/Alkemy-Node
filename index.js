const express = require('express');
const routerAPI = require('./routes/index')

const app = express();
const port = 8080;

app.get('/', (req, res)=>{
    console.log('listening')
})

app.listen(port)