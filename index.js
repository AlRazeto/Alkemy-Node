const express = require('express');
const sequelize = require('./libs/sequelize');
const routerAPI = require('./routes/index');
const {errorHandler, logError, boomErrorHandler} = require('./middlewares/error.middleware');
const bodyParser =require('body-parser')

const app = express();
const port = 8080;

app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    console.log('listening')
});

//routing
routerAPI(app)

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});