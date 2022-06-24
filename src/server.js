'use strict'

require ('dotenv').config();

let PORT = process.env.PORT || 3070;

const express = require('express');

const signInRoute = require('./routes/signIn.route');
const signUpRoute = require('./routes/signUp.route')
const notFoundPage = require('./error-handlers/404');
const errorHandler = require('./error-handlers/505');

const app = express();
app.use(express.json());


app.use(signInRoute);
app.use(signUpRoute);
app.use('*',notFoundPage);
app.use(errorHandler);

app.get("/",(req,res)=>{
    res.send("Welcome home page");
    });
    

function start(port){
    app.listen(port,()=>{
        console.log(`Server is listing now on Port : ${port}`)
    });
}

module.exports = {
    app: app,
    start: start
  };