const User = require('../include/models').userModel;
const jsonResponse = require('../include/json_response');

let saveUser = (user) => {
    return new Promise((resolve, reject) => {
        user.save((err, user) => {
            if (err) {
                reject({
                    ok: false,
                    err
                });
            }
            resolve({
                ok: true,
                user
            });
        });
    });
}

let getUsers = (args, from, limit) => new Promise((resolve, reject) => {
    User.find(args, 'name email status role google img')
        .limit(limit)
        .skip(from)
        .exec((err, users) => {
            if (err) {
                reject({
                    ok: false,
                    err
                });
            }
            User.countDocuments(args, (err, count) => {
                if (err) {
                    reject({
                        ok: false,
                        err
                    });
                }
                resolve({
                    ok: true,
                    users,
                    count
                });
            });

        });
});


let getUser = args => new Promise((resolve, reject) => {
    User.find(args, 'name email status role google img')
        .exec((err, user) => {
            if (err) {
                reject({
                    ok: false,
                    err
                });
            }
            resolve({
                ok: true,
                user
            });
        });
});


let updateUser = (id, body) => new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, user) => {
        if (err) {
            reject({
                ok: false,
                err
            });
        }
        resolve({
            ok: true,
            user
        });
    });
});


let deleteUser = (id) => new Promise((resolve, reject) => {
    let status = {
        status: false
    }
    User.findByIdAndUpdate(id, status, {
        new: true
    }, (err, userDeleted) => {
        if (err) {
            reject({
                ok: false,
                err
            });
        }
        if (!userDeleted) {
            reject({
                ok: false,
                err: {
                    message: "User not found"
                }
            });
        }
        resolve({
            ok: true,
            user: userDeleted
        })
    });
});

module.exports = {
    saveUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};