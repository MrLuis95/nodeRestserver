'use strict'

const importer = require('../util/importer');
let controllers = [
    'userController', 
    'loginController',
    'categoryController',
    'productController',
    'uploadController'
];
module.exports = importer.imports('controllers',controllers);