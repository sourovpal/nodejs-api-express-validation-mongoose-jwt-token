const { checkSchema } = require('express-validator');
const Admin = require('../models/Admin');

const AdminCreateValidation = checkSchema({
    name:{
        notEmpty:true,
        errorMessage:'Name field is required.',
    },
    username:{
        notEmpty:true,
        errorMessage:'Username field is required.',
        custom: {
            options: value => {
                return Admin.find({ username: value }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Username already in use.');
                    }
                })
            }
        }
    },
    email:{
        notEmpty:true,
        errorMessage:'Email Address field is required.',
        custom: {
            options: value => {
                return Admin.find({ email: value }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Email Address already in use.');
                    }
                })
            }
        }
    },
    password:{
        notEmpty:true,
        errorMessage:'Password field is required.',
    },
});


const AdminLoginValidation = checkSchema({
    email:{
        notEmpty:true,
        errorMessage:'Email Address field is required.',
    },
    password:{
        notEmpty:true,
        errorMessage:'Password field is required.',
    },
});









module.exports = {
    AdminCreateValidation,
    AdminLoginValidation,
    // update,
}