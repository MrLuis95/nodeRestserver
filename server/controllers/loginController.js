'use strict'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../include/models').userModel;
const jsonResponse = require('../include/json_response');
const saveUser = require('./userController').saveUser

let getToken = (user) => {
    return jwt.sign({
        user: user
    }, process.env.SEED, {
        expiresIn: process.env.EXPIRATION_DATE
    });
}

let getUser = (args, pass) => new Promise((resolve, reject) => {
        User.findOne(args, (err, userDB) => {
            if (err) {
                reject(jsonResponse.error(500, err));
            }
            if (!userDB) {
                reject(jsonResponse.error(400, {
                    message: "Usuario o contraseña incorrecta"
                }));
            }
            if (userDB && !bcrypt.compareSync(pass, userDB.password)) {
                reject(jsonResponse.error(400, {
                    message: "Usuario o contraseña incorrecta"
                }));
            }
            let token = getToken(userDB);
            resolve(jsonResponse.ok(200, {
                user: userDB,
                token
            }));

        });
    });


let googleAuth = (guser) => {
    let args = {
        email: guser.email
    }
    return new Promise((resolve, reject) => {
        User.findOne(args, (err, userDB) => {
            if (err) {
                reject(jsonResponse.error(500, err));
            }
            if (userDB) {
                if (!userDB.google) {
                    reject(jsonResponse.error(400, {
                        message: "Use normal auth"
                    }))
                } else {
                    let token = getToken(userDB);
                    resolve(jsonResponse.ok(200, {
                        user: userDB,
                        token
                    }));
                }
            } else {
                guser.password = ':)';
                let user = new User({
                    name: guser.name,
                    email: guser.email,
                    password: bcrypt.hashSync(guser.password, 10),
                    role: guser.role,
                    google: guser.google,
                    img: guser.picture
                });
                let token = getToken(user);
                saveUser(user).then((objRes) => resolve(jsonResponse.ok(200, {
                        newUser: true,
                        user: user,
                        token
                    })))
                    .catch((err) => reject(jsonResponse.error(500, err)));

            }
        });
    });

}

module.exports = {
    getUser,
    googleAuth
}