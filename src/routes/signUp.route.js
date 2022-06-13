'use strict'
const express = require('express');
const bcrypt = require('bcrypt');


const {users} = require('../models/index');

const signUpRoute = express.Router();

signUpRoute.post('/signup',async(req,res)=>{
    try {
     req.body.password = await bcrypt.hash(req.body.password,10);
     const record = await users.create(req.body);
     res.status(201).json(record);
    } 
    catch(e) { res.status(500).send('Error try again'); }
});

module.exports = signUpRoute;
