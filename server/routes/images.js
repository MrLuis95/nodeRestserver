const express = require('express');
const fs = require('fs');
const path = require('path');
const log = require('../include/log').initLogger(__filename);
const mid = require('../include/middlewares');

let app = express();

app.get('/imagen/:type/:img',[mid.auth.verifyToken,mid.upload.verifyType],(req,res)=>{
    let folder = req.file.folder;
    let img = req.params.img;
    let pathURI = path.resolve(__dirname,`../../uploads/${folder}/${img}`); 

    if(fs.existsSync(pathURI)){
        res.sendFile(pathURI);
    }else{
        res.sendFile(path.resolve(__dirname,'../assets/no-image.jpg'))
    }
})


module.exports= app;