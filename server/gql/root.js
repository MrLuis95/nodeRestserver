const bcrypt = require('bcryptjs');
const controllers = require('../controllers/controllers');
const User = require('../models/user');

let createUser = (data) => {
    let body = data.input
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    return controllers.userController.saveUser(user)
    .then(obj=>toUser(obj.user))
    .catch(obj=>obj)
}

let toUser = (temp) => {
    return {
        id: temp._id.toString(),
        name: temp.name,
        email: temp.email,
        password: temp.password,
        role: temp.role,
        status: temp.status,
        google: temp.google
    }
}


const root = {
    greetings: () => 'Hello World!',
    greeting: ({
        name
    }) => `Hello ${ name }`,
    user: ({
        id
    }) => "get user " + id,
    createUser: createUser,
    updateUser: (data) => "update user",
};



module.exports = {
    root
}