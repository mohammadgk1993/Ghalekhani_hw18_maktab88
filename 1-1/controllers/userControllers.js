const createError = require('http-errors');
const url = require('url');
const User = require("../models/User")


const getRegisterPage = (req, res, next) => {
    if (req.session.user) return res.redirect("/user/dashboard");
    res.render("pages/register", {errorMessage: req.query.errorMessage? req.query.errorMessage : null});
};


const registerUser = async (req, res, next) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    });

    try {
        await newUser.save();

        // res.render("pages/login");
        res.redirect("/user/login");
    } catch (err) {
        res.render("pages/register", {errorMessage: "Server Error!"});
        res.redirect(url.format({
            pathname:"/user/register",
            query: {
               "errorMessage": "Server Error!"
             }
          }))


        // next(createError(500,err.message))
        //   res.redirect(`/user/register?errorMessage=Server Error`);
    };
};


const getLoginPage = (req, res, next) => {
    if (req.session.user) return res.redirect("/user/dashboard");

    // let errorMessage = null;
    // if (req.query.errorMessage) errorMessage = req.query.errorMessage;
    const { errorMessage = null } = req.query;

    res.render("pages/login", {errorMessage});
};


const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) return res.redirect(`/user/login?errorMessage=User not found!`);

        const isMatch = await user.validatePassword(req.body.password);
        if (!isMatch) return res.redirect(`/user/login?errorMessage=User not found!`);

        req.session.user = user;
        res.redirect("/user/dashboard");
    } catch (err) {
        res.redirect(url.format({
            pathname:"/user/login",
            query: {
               "errorMessage": "Server Error!"
             }
        }))
    };
};


const getDashboardPage = (req, res, next) => {
    let {firstName,lastName,username,password,gender,role} = req.session.user
    if (!req.session.user) return res.redirect("/user/login");

    res.render("pages/dashboard", {user: {firstName,lastName,username,password,gender,role}});
};


const logout = (req, res, next) => {
    req.session.destroy();

    res.redirect("/user/login");
};


const updateUser = (req, res, next) => {
    let updatedUser = {}
    const id = req.session.user._id
    console.log(id)

    if (!!req.body.firstName) updatedUser.firstName = req.body.firstName
    if (!!req.body.lastName) updatedUser.lastName = req.body.lastName
    if (!!req.body.password) updatedUser.password = req.body.password
    if (!!req.body.gender) updatedUser.gender = req.body.gender
    if (!!req.body.role) updatedUser.role = req.body.role

    console.log(req.body)
    User.findByIdAndUpdate(id,updatedUser)
    .then(data => {
        console.log(data)
        req.session.user = {...req.session.user,...updatedUser}
        console.log(req.session.user)
        const {firstName,lastName,username,password,gender,role} = req.session.user
        // res.json(data)
        console.log({firstName,lastName,username,password,gender,role})
        res.json({firstName,lastName,username,password,gender,role})
    })
    .catch(err => next(createError(500, err.message)));
}


const deleteUser = (req, res, next) => {
    console.log(req.session.user.username)
    User.deleteOne({username:req.session.user.username})
    .then(data => {
        req.session.destroy();
        console.log("ok")
        res.json(data)
    })
    .catch(err => next(createError(500, err.message)));
}


module.exports = {
    getRegisterPage,
    registerUser,
    getLoginPage,
    loginUser,
    getDashboardPage,
    logout,
    updateUser,
    deleteUser
}