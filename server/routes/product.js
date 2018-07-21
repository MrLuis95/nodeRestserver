const express = require('express');
const _ = require('underscore');

const log = require('../include/log').initLogger(__filename);
const auth = require('../include/middlewares').auth;
const productController = require('../include/controllers').productController;
const Product = require('../include/models').productModel;
const jsonResponse = require('../include/json_response');

let app = express();
app.get('/products', auth.verifyToken, (req, res) => {
    let limit = Number(req.query.limit) || 5;
    let page = Number(req.query.page) || 1;
    if (limit == 0 || page == 0) {
        res.send(jsonResponse.error(400, {
            message: 'Invalid params in request'
        }));
    }
    let from = (page - 1) * limit;

    productController.findProducts(limit, from)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err.data));
});
app.get('/product/search', auth.verifyToken, (req, res) => {

    let args = _.pick(req.query,['name','description']);
    for (let key in args){   
        args[key] = new RegExp(args[key],'i');
    }
    productController.findProductByQuery(args)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err.data));
});
app.get('/product/:id', auth.verifyToken, (req, res) => {
    let id = req.params.id;
    productController.findProduct(id)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err.data));
});
app.post('/product', auth.verifyToken, (req, res) => {
    let body = req.body;
    body.user = req.user._id;
    let product = createProduct(body);
    productController.saveProduct(product)
        .then(obj => {
            res.status(obj.status).send(obj.data)
        })
        .catch(err => res.status(err.status).send(err.data));
});
app.put('/product/:id', auth.verifyToken, (req, res) => {
    let product = _.pick(req.body, ['name', 'description', 'unitPrice'])
    let id = req.params.id;
    productController.updateProduct(id, product)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err.data));
});
app.delete('/product/:id', auth.verifyToken, (req, res) => {
    let id = req.params.id;
    productController.deleteProduct(id)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err.data));
});

let createProduct = (body) => new Product({
    id: body.id,
    name: body.name,
    unitPrice: body.unitPrice,
    description: body.description,
    available: body.available,
    category: body.category,
    user: body.user
});

module.exports = app;