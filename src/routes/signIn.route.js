'use strict'

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64')


const { users } = require('../models/index');
const signInRoute = express.Router();
const autho = require('../authorization/auth');

signInRoute.post('/signin', autho, async (req, res) => {

    let basicHeaderParts = req.headers.authorization.split(" ");
    let encoded = basicHeaderParts[1];

    let decoded = base64.decode(encoded);

    let username = decoded.split(":")[0];
    let password = decoded.split(":")[1];

    try {
        const user = await users.findOne({ where: { name: username } });
        const inValid = await bcrypt.compare(password, user.password);
        if (inValid) {
            res.status(200).json({
                user
            });
        } else {
            res.status(500).send("wrong username or password")
        }
    } catch (e) {
        res.status(500).send("app error")
    }
});
module.exports = signInRoute;
