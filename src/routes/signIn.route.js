'use strict'

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64')


const { users } = require('../models/index');
const signInRoute = express.Router();
const basicAuth = require('../authorization/basicAuth');

signInRoute.post('/signin', basicAuth, async (req, res) => {

    let basicHeaderParts = req.headers.authorization.split(" ");
    let encoded = basicHeaderParts[1];

    let decoded = base64.decode(encoded);

    let [username, password] = decoded.split(':');
    // let username = decoded.split(":")[0];
    // let password = decoded.split(":")[1];

    try {
        const user = await users.findOne({ where: { username: username } });
        const inValid = await bcrypt.compare(password, user.password);
        if (inValid) {
            res.status(200).json({
                message: 'Successfully signed in',
                user: `The user ${user.username}`,
            });
        }
    } catch (e) {
        res.status(500).send("app error");
    }
});
module.exports = signInRoute;
