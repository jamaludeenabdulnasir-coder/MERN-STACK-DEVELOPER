const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    firstname: {
        type: String,
        trim: true,
        default: ""
    },

    surname: {
        type: String,
        trim: true,
        default: ""
    },

    active: {
        type: Boolean,
        default: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, { timestamps: true });

module.exports = mongoose.model("user", UserSchema);
