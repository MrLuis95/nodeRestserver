const importer = require('../util/importer');
let middlewares = [
    'auth',
    'upload'
];

module.exports=importer.imports('middlewares',middlewares);