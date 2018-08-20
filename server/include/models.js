const importer = require('../util/importer')
let models = [
    'userModel',
    'categoryModel',
    'productModel'
];

let userModel = require('../models/userModel');
let categoryModel = require('../models/categoryModel');
let productModel = require('../models/productModel');

module.exports = importer.imports('models',models)