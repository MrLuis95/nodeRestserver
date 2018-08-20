'use strict'
const importer = require('../util/importer');
let routes = [
    'user',
    'login', 
    'category', 
    'product', 
    'upload',
    'images'
];


module.exports = importer.importRoutes(routes);