const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type:String, 
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type:String, 
        required: true, 
        unique: true,
        lowercase: true,
    },
    password:{
        type:String, 
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default:"user",
    }, 
    dateCreated:{
        type: Date, 
        default: Date.now,
    },
}, {timestamps: true});

const User = mongoose.model("user", userSchema);
module.exports = User;
