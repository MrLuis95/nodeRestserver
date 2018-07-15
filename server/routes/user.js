'use strict'
const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const User = require('../models/user');
const {userController} = require('../controllers/controllers');


const app = express();

app.get('/users', function (req, res) {
    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;
    let args={"status":true} 
    userController.getUsers(args,from,limit)
    .then((objRes) => res.send(objRes))
    .catch((err) => res.status(400).send(err))
});

app.post('/user', function (req, res) {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    userController.saveUser(user)
    .then((objRes) => res.send(objRes))
    .catch((err) => res.status(400).send(err));
});

app.put('/user/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);
    userController.updateUser(id,body)
    .then((objRes) => res.send(objRes))
    .catch((err) => res.status(400).send(err));
})

app.delete('/user/:id', function (req, res) {
    let id = req.params.id;
    userController.deleteUser(id)
    .then((objRes)=> res.send(objRes))
    .catch((err)=>res.status(400).send(err));
});

module.exports = app;