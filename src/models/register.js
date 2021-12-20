const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

//create collections
const Register = new mongoose.model("Register", userSchema);
module.exports = Register ;
