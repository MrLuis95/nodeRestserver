const fs = require('fs');
const path = require('path');
const jsonResponse = require('../include/json_response');
const log = require('../include/log').initLogger(__filename);
const models = require('../include/models');

let upload = (id, file, folder,ext) => new Promise((resolve, reject) => {
    let filename = genFilename(id,ext);
    file.mv(`./uploads/${folder}/${filename}`, (err) => {
        if (err) {
            reject(jsonResponse.error(500, err));
        }
        saveDB(id, folder, filename)
            .then(resp => resolve(resp))
            .catch(err => reject(err));
    });

});

let genFilename = (id,ext)=>{    
    let now = new Date();
    req.file.filename = `${id}_${now.getFullYear()}${now.getMonth()}${now.getDate()}_${now.getMilliseconds()}.${ext}`;
}

let saveDB = (id, folder, filename) => new Promise((resolve, reject) => {
    let promSave;
    if (folder == 'users/') {
        promSave = saveImgUser(id, filename);
    } else {
        promSave = saveImgProduct(id, filename);
    }
    promSave
        .then(uploaded => resolve(uploaded))
        .catch(err => {
            borrarImg(folder, filename);
            reject(err)
        });
});

let saveImgUser = (id, filename) => new Promise((resolve, reject) => {
    models.userModel.findById(id, (err, usr) => {
        if (err) {
            reject(jsonResponse.error(400, err));
        }
        if (!usr) {
            reject(jsonResponse.error(400, {
                message: "User not valid"
            }));
        }
        saveImgDB('users/', usr, filename)
            .then(uploaded => resolve(uploaded))
            .catch(err => reject(err));
    });
});

let saveImgDB = (folder, dbObject, filename) => new Promise((resolve, reject) => {
    borrarImg(folder, dbObject.img);
    dbObject.img = filename;
    dbObject.save((err, dbObject) => {
        if (err) {
            reject(jsonResponse.error(400, err))
        }
        resolve(jsonResponse.ok(200, dbObject));
    });

});
let borrarImg = (folder, filename) => {
    let pathURI = path.resolve(__dirname, `../../uploads/${folder}${filename}`);
    log.debug(pathURI);
    if (fs.existsSync(pathURI)) {
        fs.unlinkSync(pathURI);
    }
}

let saveImgProduct = (id, filename) => new Promise((resolve, reject) => {
    models.productModel.findById(id, (err, product) => {
        if (err) {
            reject(jsonResponse.error(400, err))
        }
        if (!product) {
            reject(jsonResponse.error(400, {
                message: 'Product not fount'
            }));
        }
        saveImgDB('products/', product, filename)
            .then(uploaded => resolve(uploaded))
            .catch(err => reject(err));
    });
});

module.exports = {
    upload
}