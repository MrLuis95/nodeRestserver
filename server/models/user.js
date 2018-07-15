const mongoose = require('mongoose');
const unique_validator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let validRole = {
    values:['USER_ROLE','ADMIN_ROLE'],
    message:'{VALUE} is not a valid role.'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: [true, 'Rol is required'],
        default: 'USER_ROLE',
        enum: validRole
    },
    status: {
        type: Boolean,
        required: [true, 'Status is required'],
        default: true
    },
    google: {
        type: Boolean,
        required: false,
        default: false
    },
});

userSchema.plugin(unique_validator,{message:'{PATH} has been already registered'});
userSchema.methods.toJson = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports= mongoose.model('user',userSchema);