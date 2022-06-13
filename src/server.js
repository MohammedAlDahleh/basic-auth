'use strict'

require ('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');

const signInRoute = require('./routes/signIn.route');
const signUpRoute = require('./routes/signUp.route')
const notFoundPage = require('./error-handlers/404');
const errorHandler = require('./error-handlers/505');

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
res.send("Welcome home page");
});

app.use(signInRoute);
app.use(signUpRoute);
app.use('*',notFoundPage);
app.use(errorHandler);

function start(PORT){
    app.listen(PORT,()=>{
        console.log(`Server is listing now on Port : ${PORT}`)
    });
}

module.exports = {
    app: app,
    start: start
  };