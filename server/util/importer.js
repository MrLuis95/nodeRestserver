'use strict'
const express = require('express');
const path = require('path');
const log = require('../include/log').initLogger(__filename);
const app = express();

let importRoutes = (routes) => {
    for(let filename of routes) {
        app.use(require( path.resolve(__dirname,`../routes/${filename}`) ));
    }
    return app;
}

let imports = (folder,filenames)=>{
    let imports = new Object();
    for(let filename of filenames) {
        let obj = require( path.resolve(__dirname,`../${folder}/${filename}`) );
        imports[filename] = obj;
    }
    return imports;
}


module.exports = {importRoutes,imports}