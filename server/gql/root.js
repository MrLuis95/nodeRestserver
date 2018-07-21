const bcrypt = require('bcryptjs');
const controllers = require('../include/controllers');
const User = require('../include/models').userModel;

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
    .catch(obj=>obj);
}

let updateUser = (data) => {
    let body = data.input
    let id = data.id; 
    return controllers.userController.updateUser(id,body)
    .then(obj=>toUser(obj.user))
    .catch(obj=>obj);
}

let getUser = (data) =>{
    let args = {"_id":data.id};
    console.log(args);
    return controllers.userController.getUser(args)
    .then(obj=>toUser(obj.user[0]))
    .catch(obj=>obj);
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
    user: getUser,
    createUser: createUser,
    updateUser: updateUser,
};



module.exports = {
    root
}