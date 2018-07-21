const express = require('express');
const _ = require('underscore');

const Category = require('../include/models').categoryModel;
let auth = require('../include/middlewares').auth;
let categoryController = require('../include/controllers').categoryController;
let app = express();

app.get('/categories', auth.verifyToken, (req, res) => {
    categoryController.getCategories()
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err));
});
app.get('/category/:id', auth.verifyToken, (req, res) => {
    let id = req.params.id;
    categoryController.getCategory(id)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err));
});
app.post('/category', auth.verifyToken, (req, res) => {
    let category = new Category({
        description: req.body.description,
        user: req.user._id
    })
    categoryController.saveCategory(category)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err));
});
app.put('/category/:id', auth.verifyToken, (req, res) => {
    let id = req.params.id;
    let category = _.pick(req.body,['description'])
    categoryController.updateCategory(id,category)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err));
});
app.delete('/category/:id', [auth.verifyToken, auth.verifyAdminRole], (req, res) => {
    let id = req.params.id;
    categoryController.deleteCategory(id)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err));
});

module.exports = app;