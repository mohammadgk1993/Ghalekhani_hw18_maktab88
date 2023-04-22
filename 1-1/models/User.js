const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"firstname is required"],
        minLength: [3,"firstname muse be at least 3 characters"],
        mixLength: [30,"firstname muse be at most 3 characters"],
        match: [/^[a-zA-Z ,']+$/i,"Enter valid firstname"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true,"lastname is required"],
        minLength: [3,"lastname muse be at least 3 characters"],
        mixLength: [30,"lastname muse be at most 3 characters"],
        match: [/^[a-zA-Z ,']+$/i,"Enter valid lastname"],
        trim: true
    },
    username: {
        type: String,
        required: [true,"username is required"],
        unique: [true,"this user name is already exist"],
        trim: true
    },
    password: {
        type: String,
        required: [true,"password is required"],
        minLength: [8,"password muse be at least 8 characters"],
        match: [/^(?=.*[A-Za-z])(?=.*\d).+$/ , "Enter at least 1 alphabetic character and 1 number"]
    },
    gender : {
        type: String,
        enum : ["male","female","not-set"],
        default:"not-set"
    },
    role : {
        type: String,
        enum: ["admin","user"],
        default:"user"
    }
}, {
    timestamps: true
});

UserSchema.pre("save", async function(next) {
    if (!this.isNew && !this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        return next();
    } catch (err) {
        next(err);
    };
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};



module.exports = mongoose.model("user", UserSchema);