'use strict'
const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const User = require('../include/models').userModel;
const userController = require('../include/controllers').userController;
const auth = require('../include/middlewares').auth;


const app = express();

app.get('/users', auth.verifyToken ,function (req, res) {
    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;
    let args={"status":true} 
    userController.getUsers(args,from,limit)
    .then((objRes) => res.send(objRes))
    .catch((err) => res.status(400).send(err))
});

app.get('/user/:id', auth.verifyToken, function (req, res) {
    let args={"_id":req.params.id} 
    userController.getUser(args)
    .then((objRes) => res.send(objRes))
    .catch((err) => res.status(400).send(err))
});

app.post('/user', [auth.verifyToken,auth.verifyAdminRole], function (req, res) {
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

app.put('/user/:id', [auth.verifyToken,auth.verifyAdminRole], function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);
    userController.updateUser(id,body)
    .then((objRes) => res.send(objRes))
    .catch((err) => res.status(400).send(err));
})

app.delete('/user/:id', [auth.verifyToken,auth.verifyAdminRole], function (req, res) {
    let id = req.params.id;
    userController.deleteUser(id)
    .then((objRes)=> res.send(objRes))
    .catch((err)=>res.status(400).send(err));
});

module.exports = app;