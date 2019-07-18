const { config } = require('./src/config/config');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./src/controllers/index'));

const public = path.resolve(__dirname,'public');
app.use(express.static(public));

app.listen(config.port,() =>{
    console.log(`Listening port ${ config.port }`);
})