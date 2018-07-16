'use strict'
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let getUser = (args, pass) => {
    let uopIncorrect = {
        status: 400,
        data: {
            ok: false,
            err: {
                message: "Usuario o contraseña incorrecta"
            }
        }
    }
    return new Promise((resolve, reject) => {
        User.findOne(args, (err, userDB) => {
            if (err) {
                reject({
                    status: 500,
                    data: {
                        ok: false,
                        err
                    }
                });
            }
            if (!userDB) {
                reject(uopIncorrect);
            }
            if (userDB && !bcrypt.compareSync(pass, userDB.password)) {
                reject(uopIncorrect);
            }
            let token = jwt.sign({
                user: userDB
            }, process.env.SEED, {
                expiresIn: 60 * 60 * 24 * 30
            });
            resolve({
                status: 200,
                data: {
                    ok: true,
                    user: userDB,
                    token
                }
            });

        });
    });
}

module.exports = {
    getUser
}