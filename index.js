const express = require('express');
const sequelize = require('./libs/sequelize');
const routerAPI = require('./routes/index');

const app = express();
const port = 8080;

app.get('/', (req, res)=>{
    console.log('listening')
})

app.listen(port, async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})