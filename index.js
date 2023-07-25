const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const {expressValidator} = require('express-validator');

/*================================================================================
                        Setup Modules
// ================================================================================== */
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

/*================================================================================
Connect Database
================================================================================== */
const connect = async()=>{
    await mongoose.connect(process.env.DATABASE_HOST+process.env.DATABASE_NAME)
}

/*================================================================================
Router
================================================================================== */
app.use('/',  require('./router/index'));


/*================================================================================
Listening
================================================================================== */

app.listen(5000, ()=>{
    connect();
    console.log('http://localhost:5000');
});
