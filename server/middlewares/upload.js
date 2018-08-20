let jsonResponse = require('../include/json_response')
let verifyType = (req, res, next) => {
    let type = req.params.type;
    let validTypes = ['product', 'user'];
    if (validTypes.indexOf(type) < 0) {
        let err = jsonResponse.error(400, {
            message: "Invalid type argument"
        });
        res.status(err.status).send(err.data);
    }
    if(req.file == undefined){
        req.file = new Object();
    }
    req.file.folder = type === 'product' ? 'products/' : 'users/';
    next();
}


let verifyExt = (req, res, next) => {
    if (!req.files) {
        let err = jsonResponse.error(400, {
            message: "File is required"
        })
        return res.status(err.status).send(err.data);
    }
    let file = req.files.file;
    let filename = file.name.split('.');
    let ext = filename[filename.length - 1];
    let validExt = ['png', 'jpg', 'gif', 'jpeg'];

    if (validExt.indexOf(ext) < 0) {
        let err = jsonResponse.error(400, {
            message: 'The file extension isn\'t valid',
            valid: validExt,
            ext
        });
        return res.status(err.status).send(err.data);
    }
    req.file = new Object();
    req.file.file = file;
    req.file.ext = ext;
    next();
}

module.exports = {
    verifyExt,
    verifyType
}