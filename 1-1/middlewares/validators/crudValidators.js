const createError = require('http-errors');
const User = require('../../models/User');


console.log(456);
//CREATE VALIDATOR
async function createUserValidator(req, res, next) {
    // firstName validations
    if (!req.body.firstName) {
        return next(createError(400, "FirstName is required!"))
    };

    if (typeof req.body.firstName !== "string") {
        return next(createError(400, "FirstName must be string!"))
    };

    if (req.body.firstName.length > 30 || req.body.firstName.length < 3) {
        return next(createError(400, "FirstName length must be between 3 and 30!"))
    };

    if (!(/^[a-zA-Z ,']+$/i.test(req.body.firstName))) {
        return next(createError(400, "just alphabetic characters fo firstName!"))
    };


    // lastName validations
    if (!req.body.lastName) {
        return next(createError(400, "lastName is required!"))
    };

    if (typeof req.body.lastName !== "string") {  
        return next(createError(400, "lastName must be string!"))
    };

    if (req.body.lastName.length > 30 || req.body.lastName.length < 3) {
        return next(createError(400, "lastName length must be between 3 and 30!"))
    };

    if (!(/^[a-zA-Z ,']+$/i.test(req.body.lastName))) {
        return next(createError(400, "just alphabetic characters fo lastName!"))
    };


    //USERNAME VALIDATIONS
    if (!req.body.username) {
        return next(createError(400, "userName is required!"))
    };

    let userNameExistance = await User.findOne({"userName":req.body.username})

    if (userNameExistance) {
        return next(createError(400, "userName is already exist!"))
    }


    //PASSWORD VALIDATION
    if (!req.body.password) {
        return next(createError(400, "password is required!"))
    };

    if (typeof req.body.password !== "string") {  
        return next(createError(400, "password must be string!"))
    };

    if (req.body.password.length < 8) {
        return next(createError(400, "password must be at least 8 characters!"))
    };

    if (!(/^(?=.*[A-Za-z])(?=.*\d).+$/.test(req.body.password))) {
        return next(createError(400, "Enter at least 1 alphabetic character and 1 number for password"))
    };

    
    next();
};


//UPDATE VALIDATOR
async function updateUserValidator(req, res, next) {
    //FIRSTNAME VALIDATIONS
    if (!!req.body.firstName) {
        if (!req.body.firstName) {
            return next(createError(400, "FirstName is required!"))
        };

        if (typeof req.body.firstName !== "string") {
            return next(createError(400, "FirstName must be string!"))
        };

        if (req.body.firstName.length > 30 || req.body.firstName.length < 3) {
            return next(createError(400, "FirstName length must be between 3 and 30!"))
        };

        if (!(/^[a-zA-Z ,']+$/i.test(req.body.firstName))) {
            return next(createError(400, "just alphabetic characters fo firstName!"))
        };
    }


    //LASTNAME VALIDATIONS
    if (!!req.body.lastName) {
        if (!req.body.lastName) {
            return next(createError(400, "lastName is required!"))
        };
    
        if (typeof req.body.lastName !== "string") {  
            return next(createError(400, "lastName must be string!"))
        };
    
        if (req.body.lastName.length > 30 || req.body.lastName.length < 3) {
            return next(createError(400, "lastName length must be between 3 and 30!"))
        };
    
        if (!(/^[a-zA-Z ,']+$/i.test(req.body.lastName))) {
            return next(createError(400, "just alphabetic characters fo lastName!"))
        };
    }


    //PASSWORD VALIDATION
    if (!!req.body.password) {
        if (!req.body.password) {
            return next(createError(400, "password is required!"))
        };
    
        if (typeof req.body.password !== "string") {  
            return next(createError(400, "password must be string!"))
        };
    
        if (req.body.password.length < 8) {
            return next(createError(400, "password must be at least 8 characters!"))
        };
    
        if (!(/^(?=.*[A-Za-z])(?=.*\d).+$/.test(req.body.password))) {
            return next(createError(400, "Enter at least 1 alphabetic character and 1 number for password"))
        };
    }


    next();
};

module.exports = {
    createUserValidator,
    updateUserValidator,
};