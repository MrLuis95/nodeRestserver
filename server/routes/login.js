const express = require('express');

const {
    loginController
} = require('../include/controllers');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    let args = {
        email: body.email
    }
    loginController.getUser(args, body.password)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err.data));
});

module.exports = app;